import { NgModule, ModuleWithProviders } from '@angular/core';
import { AndroidTouch } from "./devices/android/android.touch";
import { TouchDriver } from "./touch.driver";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { SecureStorage } from "@ionic-native/secure-storage";
import { TouchID } from "@ionic-native/touch-id";
import { TouchSecureStorage } from "./storage/touch.storage";
import { IosTouch } from "./devices/ios/ios.touch";

@NgModule()
export class TouchModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TouchModule,
      providers: [TouchID, AndroidFingerprintAuth, SecureStorage, IosTouch, AndroidTouch, TouchDriver, TouchSecureStorage]
    }
  }
}