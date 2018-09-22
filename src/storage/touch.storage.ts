import { Injectable } from "@angular/core";
import { SecureStorage, SecureStorageObject } from "@ionic-native/secure-storage";
import { TOUCH_ANDROID_ERRORS, TOUCH_CONSTANTS } from "../constants/touch.constants";
import { WordArray } from "crypto-js";

@Injectable()
export class TouchSecureStorage {
  constructor(private storage: SecureStorage) {
  }

  private init() {
    return this.storage.create(TOUCH_CONSTANTS.storageKey);
  }

  saveCredentials(encryptedCredentials: WordArray) {
    return this.init()
        .then((storageInstance: SecureStorageObject) => storageInstance.set(TOUCH_CONSTANTS.storedKey, encryptedCredentials.toString()));
  }

  saveAndroidKey(key: WordArray) {
    return this.init()
        .then((storageInstance: SecureStorageObject) => storageInstance.set(TOUCH_CONSTANTS.androidTokenKey, key.toString()));
  }

  getCredentials(): Promise<WordArray> {
    return this.init()
        .then((storageInstance: SecureStorageObject) => storageInstance.get(TOUCH_CONSTANTS.storedKey))
        .then((encryptedCredentials: any) => encryptedCredentials);
  }

  getAndroidKey(): Promise<WordArray> {
    return this.init()
        .then((storageInstance: SecureStorageObject) => storageInstance.get(TOUCH_CONSTANTS.androidTokenKey))
        .then((encryptedToken: any) => encryptedToken)
        .catch(() => {
          throw TOUCH_ANDROID_ERRORS.ANDROID_KEY_NOT_FOUND.key;
        })
  }
}
