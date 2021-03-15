import { TOUCH_ANDROID_ERRORS, TOUCH_ERROR_RESPONSE, TOUCH_IOS_ERRORS } from "../constants/touch.constants";
import { TouchError } from "../models/touch.error";

export class ErrorHandler {
  static androidErrorHandler(error: any): TouchError {
    switch (error) {
      case TOUCH_ANDROID_ERRORS.FINGERPRINT_ERROR.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_READ_ERROR);
      case TOUCH_ANDROID_ERRORS.CANCELLED.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.CANCELLED);
      case TOUCH_ANDROID_ERRORS.NOT_AVAILABLE.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE);
      case TOUCH_ANDROID_ERRORS.PERMISSION_DENIED.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.PERMISSION_DENIED);
      case TOUCH_ANDROID_ERRORS.UPDATE_SDK.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.GENERIC_ERROR_1);
      case TOUCH_ANDROID_ERRORS.FINGERPRINT_CHANGE.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.FINGERPRINT_CHANGE);
      case TOUCH_ANDROID_ERRORS.NO_ENROLLED_FINGERPRINTS:
        return new TouchError(TOUCH_ERROR_RESPONSE.NO_ENROLLED_FINGERPRINTS);
      case TOUCH_ANDROID_ERRORS.ANDROID_KEY_NOT_FOUND.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.NO_PRIOR_SETUP);
      default:
        return new TouchError(TOUCH_ERROR_RESPONSE.GENERIC_ERROR_2);
    }
  }

  static iosErrorHandler(error: { localizedDescription: string, code: number }): TouchError {
    switch (error.code) {
      case TOUCH_IOS_ERRORS.FINGERPRINT_ERROR.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_READ_ERROR);
      case TOUCH_IOS_ERRORS.CANCELLED_PRIMARY.key:
      case TOUCH_IOS_ERRORS.CANCELLED_SECONDARY.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.CANCELLED);
      case TOUCH_IOS_ERRORS.NOT_AVAILABLE.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.TOUCH_UNAVAILABLE);
      case TOUCH_IOS_ERRORS.PERMISSION_DENIED.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.PERMISSION_DENIED);
      case TOUCH_IOS_ERRORS.TOUCH_LIMIT_REACHED.key:
        return new TouchError(TOUCH_ERROR_RESPONSE.GENERIC_ERROR_1);
      default:
        return new TouchError(TOUCH_ERROR_RESPONSE.GENERIC_ERROR_2);
    }
  }
}
