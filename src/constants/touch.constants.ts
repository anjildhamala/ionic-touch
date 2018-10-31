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
  NO_ENROLLED_FINGERPRINTS: {
    key: 'noFingerprintsEnrolled',
    value: 'No enrolled fingerprints found.'
  },
  FINGERPRINT_CHANGE: {
    key: 'KeyPermanentlyInvalidatedException',
    value: 'New Fingerprint found'
  },
  GENERIC: {
    key: '',
    value: 'Something went wrong.'
  },
  ANDROID_KEY_NOT_FOUND: {
    key: 8,
    value: "Android Key Not Found"
  }
};

export const TOUCH_ERROR_RESPONSE = {
  TOUCH_READ_ERROR: {
    status: 0,
    value: 'Error reading fingerprint'
  },
  CANCELLED: {
    status: 1,
    value: 'Fingerprint was cancelled'
  },
  TOUCH_UNAVAILABLE: {
    status: 2,
    value: 'Touch is unavailable at this moment'
  },
  PERMISSION_DENIED: {
    status: 3,
    value: 'Touch permission was denied by the device'
  },
  GENERIC_ERROR_1: {
    status: 4,
    value: 'Something went wrong with touch login. Please try again later'
  },
  GENERIC_ERROR_2: {
    status: 5,
    value: 'Something went wrong with touch login. Please try again later'
  },
  FINGERPRINT_CHANGE: {
    status: 6,
    value: 'New Fingerprint found. Please log in again to enroll and start using fingerprint.'
  },
  NO_ENROLLED_FINGERPRINTS: {
    status: 7,
    value: 'There are no enrolled fingerprints to authenticate.'
  },
  NO_PRIOR_SETUP: {
    status: 8,
    value: 'Something went wrong with touch login. Push setting will be reset and will need to be setup again.'
  },
  TOUCH_OFF: {
    status: 9,
    value: 'Touch Setting is turned off.'
  },
  TOUCH_NOT_SETUP: {
    status: 10,
    value: 'Touch Login has not been setup.'
  }
};
