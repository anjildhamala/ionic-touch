import { Injectable } from "@angular/core";
import {
  AFAAvailableResponse,
  AFADecryptOptions,
  AFAEncryptResponse,
  AndroidFingerprintAuth
} from "@ionic-native/android-fingerprint-auth";
import { DeviceInterface } from "../../interfaces/device.interface";
import { TOUCH_CONSTANTS, TOUCH_ERROR_RESPONSE } from "../../constants/touch.constants";
import { TouchError } from '../../models/touch.error';

@Injectable()
export class AndroidTouch implements DeviceInterface {
  constructor(private fingerprintAuth: AndroidFingerprintAuth) {
  }

  isAvailable(): Promise<string | TouchError> {
    return new Promise((resolve, reject) => {
      this.fingerprintAuth.isAvailable()
          .then((response: AFAAvailableResponse) => {
            if (response.isAvailable && response.hasEnrolledFingerprints && response.isHardwareDetected) {
              resolve(TOUCH_CONSTANTS.touchAvailable);
            } else if (!response.hasEnrolledFingerprints) {
              reject(new TouchError(TOUCH_ERROR_RESPONSE.NO_ENROLLED_FINGERPRINTS));
            }
          })
          .catch(() => {
            reject(new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE));
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
