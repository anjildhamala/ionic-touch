import { Injectable } from "@angular/core";
import {
  AFAAvailableResponse, AFADecryptOptions,
  AFAEncryptResponse,
  AndroidFingerprintAuth
} from "@ionic-native/android-fingerprint-auth";
import { DeviceInterface } from "../../interfaces/device.interface";
import { TOUCH_CONSTANTS } from "../../constants/touch.constants";

@Injectable()
export class AndroidTouch implements DeviceInterface {
  constructor(private fingerprintAuth: AndroidFingerprintAuth) {
  }

  isAvailable(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fingerprintAuth.isAvailable()
          .then((response: AFAAvailableResponse) => {
            if (response.isAvailable && response.hasEnrolledFingerprints && response.isHardwareDetected) {
              resolve(TOUCH_CONSTANTS.touchAvailable);
            } else if (!response.hasEnrolledFingerprints) {
              reject(TOUCH_CONSTANTS.noFingerprintsEnrolled);
            }
          })
          .catch(() => {
            reject(TOUCH_CONSTANTS.touchUnavailable)
          });
    });
  }

  setTouchSetting(clientString: string): Promise<AFAEncryptResponse> {
    return this.fingerprintAuth.encrypt({clientId: clientString});
  }

  getTouchSetting(clientId: string, token: string): Promise<AFADecryptOptions> {
    return this.fingerprintAuth.decrypt({clientId: clientId, token: token});
  }
}
