import { NgModule } from '@angular/core';
import { AndroidTouch } from "./devices/android/android.touch";
import { TouchDriver } from "./touch.driver";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth/ngx";
import { SecureStorage } from "@ionic-native/secure-storage/ngx";
import { TouchID } from "@ionic-native/touch-id/ngx";
import { TouchSecureStorage } from "./storage/touch.storage";
import { IosTouch } from "./devices/ios/ios.touch";

@NgModule({
    providers: [
        TouchID,
        AndroidFingerprintAuth,
        SecureStorage,
        IosTouch,
        AndroidTouch,
        TouchDriver,
        TouchSecureStorage
    ]
})
export class TouchModule {

}
