export const TOUCH_CONSTANTS = {
  touchAvailable: 'available',
  touchUnavailable: 'unavailable',
  noFingerprintsEnrolled: 'noFingerprintsEnrolled',
  iosVerifyMessage: 'Verify your identity to login',
  androidClientId: 'com.enso.android',
  passKey: 'com.enso.touch',
  storageKey: 'ensoStorage',
  storedKey: 'ensoKey',
  androidTokenKey: 'androidTokenKey'
};

export const TOUCH_IOS_ERRORS = {
  FINGERPRINT_ERROR: {
    key: -1,
    value: 'Fingerprint scan failed'
  },
  CANCELLED_PRIMARY: {
    key: -2,
    value: 'Fingerprint scan canceled'
  },
  CANCELLED_SECONDARY: {
    key: -128,
    value: 'Fingerprint scan canceled'
  },
  PERMISSION_DENIED: {
    key: -4,
    value: 'Cancelled by the system'
  },
  NOT_AVAILABLE: {
    key: -6,
    value: 'Touch Id Unavailable'
  },
  TOUCH_LIMIT_REACHED: {
    key: -8,
    value: 'Tried too many times'
  },
  GENERIC: {
    key: '',
    value: 'Fingerprint or device passcode could not be validated.'
  }
};

export const TOUCH_ANDROID_ERRORS = {
  CANCELLED: {
    key: 'FINGERPRINT_CANCELLED',
    value: 'Finger print scan has been cancelled'
  },
  PERMISSION_DENIED: {
    key: 'FINGERPRINT_PERMISSION_DENIED',
    value: 'Permission for finger print scan has been denied.'
  },
  UPDATE_SDK: {
    key: 'MINIMUM_SDK',
    value: 'Please update your phone to use this feature.'
  },
  NOT_AVAILABLE: {
    key: 'FINGERPRINT_NOT_AVAILABLE',
    value: 'Finger print unavailable'
  },
  FINGERPRINT_ERROR: {
    key: 'FINGERPRINT_ERROR',
    value: 'Fingerprint did not match.'
  },
  GENERIC: {
    key: '',
    value: 'Something went wrong.'
  }
};
