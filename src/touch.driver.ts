import { IosTouch } from "./devices/ios/ios.touch";
import { AndroidTouch } from "./devices/android/android.touch";
import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import {
  TOUCH_ANDROID_ERRORS,
  TOUCH_CONSTANTS,
  TOUCH_ERROR_RESPONSE,
  TOUCH_IOS_ERRORS
} from "./constants/touch.constants";
import * as CryptoJS from "crypto-js";
import { WordArray } from "crypto-js";
import { TouchSecureStorage } from "./storage/touch.storage";
import { AFAEncryptResponse } from "@ionic-native/android-fingerprint-auth";
import { Credentials } from "./interfaces/credentials.interface";

@Injectable()
export class TouchDriver {
  private isIOS: boolean;

  constructor(private iosTouch: IosTouch, private androidTouch: AndroidTouch, platform: Platform, private storage: TouchSecureStorage) {
    this.isIOS = platform.is('ios');
  }

  isAvailable(): Promise<string> {
    return this.isIOS ? this.iosTouch.isAvailable() : this.androidTouch.isAvailable();
  }

  save(username: string, password: string): Promise<any> {
    if (this.isIOS) {
      return this.iosTouch.setTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
          .then(() => this.encryptCredentialsAndSave({user: username, pass: password}))
          .catch((error) => {
            throw this.iosErrorHandler(error);
          });
    } else {
      return this.androidTouch.setTouchSetting(TOUCH_CONSTANTS.androidClientId)
          .then((response: AFAEncryptResponse) => this.encryptTokenAndSave(response.token))
          .then(() => this.encryptCredentialsAndSave({user: username, pass: password}))
          .catch((error) => {
            throw this.androidErrorHandler(error);
          });
    }
  }

  retrieve(): Promise<any> {
    if (this.isIOS) {
      return this.iosTouch.getTouchSetting(TOUCH_CONSTANTS.iosVerifyMessage)
          .then(() => this.storage.getCredentials())
          .then((encryptedCredentials: WordArray) => this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey))
          .catch((error) => {
            throw this.iosErrorHandler(error);
          });
    } else {
      return this.storage.getAndroidKey()
          .then((encryptedToken: WordArray) => this.decryptString(encryptedToken, TOUCH_CONSTANTS.androidTokenKey))
          .then((token: any) => this.androidTouch.getTouchSetting(TOUCH_CONSTANTS.androidClientId, token))
          .then(() => this.storage.getCredentials())
          .then((encryptedCredentials: WordArray) => this.decryptObject(encryptedCredentials, TOUCH_CONSTANTS.passKey))
          .catch((error) => {
            throw this.androidErrorHandler(error);
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

  private androidErrorHandler(error: any): { status: number, value: string } {
    switch (error) {
      case TOUCH_ANDROID_ERRORS.FINGERPRINT_ERROR.key:
        return TOUCH_ERROR_RESPONSE.TOUCH_READ_ERROR;
      case TOUCH_ANDROID_ERRORS.CANCELLED.key:
        return TOUCH_ERROR_RESPONSE.CANCELLED;
      case TOUCH_ANDROID_ERRORS.NOT_AVAILABLE.key:
        return TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE;
      case TOUCH_ANDROID_ERRORS.PERMISSION_DENIED.key:
        return TOUCH_ERROR_RESPONSE.PERMISSION_DENIED;
      case TOUCH_ANDROID_ERRORS.UPDATE_SDK.key:
        return TOUCH_ERROR_RESPONSE.GENERIC_ERROR_1;
      case TOUCH_ANDROID_ERRORS.FINGERPRINT_CHANGE.key:
        return TOUCH_ERROR_RESPONSE.FINGERPRINT_CHANGE;
      case TOUCH_ANDROID_ERRORS.NO_ENROLLED_FINGERPRINTS:
        return TOUCH_ERROR_RESPONSE.NO_ENROLLED_FINGERPRINTS;
      default:
        return TOUCH_ERROR_RESPONSE.GENERIC_ERROR_2;
    }
  }

  private iosErrorHandler(error: { localizedDescription: string, code: number }): { status: number, value: string } {
    switch (error.code) {
      case TOUCH_IOS_ERRORS.FINGERPRINT_ERROR.key:
        return TOUCH_ERROR_RESPONSE.TOUCH_READ_ERROR;
      case TOUCH_IOS_ERRORS.CANCELLED_PRIMARY.key:
      case TOUCH_IOS_ERRORS.CANCELLED_SECONDARY.key:
        return TOUCH_ERROR_RESPONSE.CANCELLED;
      case TOUCH_IOS_ERRORS.NOT_AVAILABLE.key:
        return TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE;
      case TOUCH_IOS_ERRORS.PERMISSION_DENIED.key:
        return TOUCH_ERROR_RESPONSE.PERMISSION_DENIED;
      case TOUCH_IOS_ERRORS.TOUCH_LIMIT_REACHED.key:
        return TOUCH_ERROR_RESPONSE.GENERIC_ERROR_1;
      default:
        return TOUCH_ERROR_RESPONSE.GENERIC_ERROR_2;
    }
  }
}
