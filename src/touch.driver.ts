import { IosTouch } from "./devices/ios/ios.touch";
import { AndroidTouch } from "./devices/android/android.touch";
import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { TOUCH_CONSTANTS } from "./constants/touch.constants";
import * as CryptoJS from "crypto-js";
import { WordArray } from "crypto-js";
import { TouchSecureStorage } from "./storage/touch.storage";
import { AFAEncryptResponse } from "@ionic-native/android-fingerprint-auth";
import { Credentials } from "./interfaces/credentials.interface";
import { ErrorHandler } from "./handlers/error.handler";
import { TouchError } from "./models/touch.error";

@Injectable()
export class TouchDriver {
  private isIOS: boolean;

  constructor(private iosTouch: IosTouch, private androidTouch: AndroidTouch, platform: Platform, private storage: TouchSecureStorage) {
    this.isIOS = platform.is('ios');
  }

  isAvailable(): Promise<string | TouchError> {
    return this.isIOS ? this.iosTouch.isAvailable() : this.androidTouch.isAvailable();
  }

  save(username: string, password: string): Promise<any> {
    if (this.isIOS) {
      return this.iosTouch.setTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
          .then(() => this.encryptCredentialsAndSave({user: username, pass: password}))
          .catch((error) => {
            throw ErrorHandler.iosErrorHandler(error);
          });
    } else {
      return this.androidTouch.setTouchSetting(TOUCH_CONSTANTS.androidClientId)
          .then((response: AFAEncryptResponse) => this.encryptTokenAndSave(response.token))
          .then(() => this.encryptCredentialsAndSave({user: username, pass: password}))
          .catch((error) => {
            throw ErrorHandler.androidErrorHandler(error);
          });
    }
  }

  retrieve(): Promise<any> {
    if (this.isIOS) {
      return this.iosTouch.getTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
          .then(() => this.storage.getCredentials())
          .then((encryptedCredentials: WordArray) => this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey))
          .catch((error) => {
            throw ErrorHandler.iosErrorHandler(error);
          });
    } else {
      return this.storage.getAndroidKey()
          .then((encryptedToken: WordArray) => this.decryptString(encryptedToken, TOUCH_CONSTANTS.androidTokenKey))
          .then((token: any) => this.androidTouch.getTouchSetting(TOUCH_CONSTANTS.androidClientId, token))
          .then(() => this.storage.getCredentials())
          .then((encryptedCredentials: WordArray) => this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey))
          .catch((error) => {
            throw ErrorHandler.androidErrorHandler(error);
          });
    }
  }

  private encryptCredentialsAndSave(credentials: Credentials) {
    const encryptedString = this.encryptObject(credentials);
    return this.storage.saveCredentials(encryptedString);
  }

  private encryptTokenAndSave(token: string) {
    const encryptedString = this.encryptString(token);
    return this.storage.saveAndroidKey(encryptedString);
  }

  private encryptString(stringToEncrypt: any): WordArray {
    return CryptoJS.AES.encrypt(stringToEncrypt, TOUCH_CONSTANTS.androidTokenKey);
  }

  private encryptObject(objToEncrypt: any): WordArray {
    return CryptoJS.AES.encrypt(JSON.stringify(objToEncrypt), TOUCH_CONSTANTS.passKey);
  }

  private decryptString(toDecrypt: WordArray, passkey: string): any {
    return CryptoJS.AES.decrypt(toDecrypt.toString(), passkey).toString(CryptoJS.enc.Utf8);
  }

  private decryptObject(toDecrypt: WordArray, passkey: string): any {
    let bytes = CryptoJS.AES.decrypt(toDecrypt.toString(), passkey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
  }
}
