import { IosTouch } from "./devices/ios/ios.touch";
import { AndroidTouch } from "./devices/android/android.touch";
import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { TOUCH_ANDROID_ERRORS, TOUCH_CONSTANTS, TOUCH_IOS_ERRORS } from "./constants/touch.constants";
import * as CryptoJS from "crypto-js";
import { WordArray } from "crypto-js";
import { TouchSecureStorage } from "./storage/touch.storage";
import { AFAEncryptResponse } from "@ionic-native/android-fingerprint-auth";
import { Credentials } from "./interfaces/credentials.interface";

@Injectable()
export class TouchDriver {
  isIOS: boolean;

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

  private androidErrorHandler(error: any): { status: number, response: string } {
    switch (error) {
      case TOUCH_ANDROID_ERRORS.FINGERPRINT_ERROR.key:
        return {
          status: 401, response: TOUCH_ANDROID_ERRORS.FINGERPRINT_ERROR.value
        };
      case TOUCH_ANDROID_ERRORS.CANCELLED.key:
        return {
          status: 400, response: TOUCH_ANDROID_ERRORS.CANCELLED.value
        };
      case TOUCH_ANDROID_ERRORS.NOT_AVAILABLE.key:
        return {
          status: 204, response: TOUCH_ANDROID_ERRORS.NOT_AVAILABLE.value
        };
      case TOUCH_ANDROID_ERRORS.PERMISSION_DENIED.key:
        return {
          status: 401, response: TOUCH_ANDROID_ERRORS.PERMISSION_DENIED.value
        };
      case TOUCH_ANDROID_ERRORS.UPDATE_SDK.key:
        return {
          status: 304, response: TOUCH_ANDROID_ERRORS.UPDATE_SDK.value
        };
      default:
        return {
          status: 500, response: TOUCH_IOS_ERRORS.GENERIC.value
        };
    }
  }

  private iosErrorHandler(error: {localizedDescription: string, code: number}): { status: number, response: string } {
    console.log(error);
    console.log(typeof error);
    switch (error.code) {
      case TOUCH_IOS_ERRORS.FINGERPRINT_ERROR.key:
        return {
          status: 401, response: TOUCH_IOS_ERRORS.FINGERPRINT_ERROR.value
        };
      case TOUCH_IOS_ERRORS.CANCELLED_PRIMARY.key:
      case TOUCH_IOS_ERRORS.CANCELLED_SECONDARY.key:
        return {
          status: 400, response: TOUCH_IOS_ERRORS.CANCELLED_SECONDARY.value
        };
      case TOUCH_IOS_ERRORS.PERMISSION_DENIED.key:
        return {
          status: 503, response: TOUCH_IOS_ERRORS.PERMISSION_DENIED.value
        };
      case TOUCH_IOS_ERRORS.NOT_AVAILABLE.key:
        return {
          status: 404, response: TOUCH_IOS_ERRORS.NOT_AVAILABLE.value
        };
      case TOUCH_IOS_ERRORS.TOUCH_LIMIT_REACHED.key:
        return {
          status: 429, response: TOUCH_IOS_ERRORS.TOUCH_LIMIT_REACHED.value
        };
      default:
        return {
          status: 500, response: TOUCH_IOS_ERRORS.GENERIC.value
        };
    }
  }
}
