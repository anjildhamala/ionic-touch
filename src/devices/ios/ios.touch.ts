import { Injectable } from "@angular/core";
import { TouchID } from "@ionic-native/touch-id";
import { DeviceInterface } from "../../interfaces/device.interface";
import { TOUCH_CONSTANTS } from "../../constants/touch.constants";

@Injectable()
export class IosTouch implements DeviceInterface {
  constructor(private touchAuth: TouchID) {
  }

  isAvailable(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.touchAuth.isAvailable()
          .then(() => {
            resolve(TOUCH_CONSTANTS.touchAvailable);
          })
          .catch((error: any) => {
            reject(error + ' ' + TOUCH_CONSTANTS.touchUnavailable);
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
