import { Injectable } from "@angular/core";
import { TouchID } from "@ionic-native/touch-id";
import { DeviceInterface } from "../../interfaces/device.interface";
import { TOUCH_CONSTANTS, TOUCH_ERROR_RESPONSE } from "../../constants/touch.constants";
import { TouchError } from '../../models/touch.error';

@Injectable()
export class IosTouch implements DeviceInterface {
  constructor(private touchAuth: TouchID) {
  }

  isAvailable(): Promise<string | TouchError> {
    return new Promise((resolve, reject) => {
      this.touchAuth.isAvailable()
          .then(() => {
            resolve(TOUCH_CONSTANTS.touchAvailable);
          })
          .catch(() => {
            reject(new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE));
          });
    });
  }

  setTouchSetting(message: string): Promise<any> {
    return this.touchAuth.verifyFingerprint(message);
  }

  getTouchSetting(message: string): Promise<any> {
    return this.touchAuth.verifyFingerprint(message);
  }
}
