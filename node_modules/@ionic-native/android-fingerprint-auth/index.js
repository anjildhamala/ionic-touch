var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core';
/**
 * @name Android Fingerprint Auth
 * @description
 * This plugin will open a native dialog fragment prompting the user to authenticate using their fingerprint. If the device has a secure lockscreen (pattern, PIN, or password), the user may opt to authenticate using that method as a backup.
 * @usage
 * ```typescript
 * import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
 *
 * constructor(private androidFingerprintAuth: AndroidFingerprintAuth) { }
 *
 * ...
 *
 *
 * this.androidFingerprintAuth.isAvailable()
 *   .then((result)=> {
 *     if(result.isAvailable){
 *       // it is available
 *
 *       this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
 *         .then(result => {
 *            if (result.withFingerprint) {
 *                console.log('Successfully encrypted credentials.');
 *                console.log('Encrypted credentials: ' + result.token);
 *            } else if (result.withBackup) {
 *              console.log('Successfully authenticated with backup password!');
 *            } else console.log('Didn\'t authenticate!');
 *         })
 *         .catch(error => {
 *            if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
 *              console.log('Fingerprint authentication cancelled');
 *            } else console.error(error)
 *         });
 *
 *     } else {
 *       // fingerprint auth isn't available
 *     }
 *   })
 *   .catch(error => console.error(error));
 * ```
 * @interfaces
 * AFAAuthOptions
 * AFAEncryptResponse
 * AFADecryptOptions
 * AFAAvailableResponse
 * AFADeleteOptions
 */
var AndroidFingerprintAuth = (function (_super) {
    __extends(AndroidFingerprintAuth, _super);
    function AndroidFingerprintAuth() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Convenience property containing all possible errors
         */
        _this.ERRORS = {
            BAD_PADDING_EXCEPTION: 'BAD_PADDING_EXCEPTION',
            CERTIFICATE_EXCEPTION: 'CERTIFICATE_EXCEPTION',
            FINGERPRINT_CANCELLED: 'FINGERPRINT_CANCELLED',
            FINGERPRINT_DATA_NOT_DELETED: 'FINGERPRINT_DATA_NOT_DELETED',
            FINGERPRINT_ERROR: 'FINGERPRINT_ERROR',
            FINGERPRINT_NOT_AVAILABLE: 'FINGERPRINT_NOT_AVAILABLE',
            FINGERPRINT_PERMISSION_DENIED: 'FINGERPRINT_PERMISSION_DENIED',
            FINGERPRINT_PERMISSION_DENIED_SHOW_REQUEST: 'FINGERPRINT_PERMISSION_DENIED_SHOW_REQUEST',
            ILLEGAL_BLOCK_SIZE_EXCEPTION: 'ILLEGAL_BLOCK_SIZE_EXCEPTION',
            INIT_CIPHER_FAILED: 'INIT_CIPHER_FAILED',
            INVALID_ALGORITHM_PARAMETER_EXCEPTION: 'INVALID_ALGORITHM_PARAMETER_EXCEPTION',
            IO_EXCEPTION: 'IO_EXCEPTION',
            JSON_EXCEPTION: 'JSON_EXCEPTION',
            MINIMUM_SDK: 'MINIMUM_SDK',
            MISSING_ACTION_PARAMETERS: 'MISSING_ACTION_PARAMETERS',
            MISSING_PARAMETERS: 'MISSING_PARAMETERS',
            NO_SUCH_ALGORITHM_EXCEPTION: 'NO_SUCH_ALGORITHM_EXCEPTION',
            SECURITY_EXCEPTION: 'SECURITY_EXCEPTION'
        };
        return _this;
    }
    /**
     * Opens a native dialog fragment to use the device hardware fingerprint scanner to authenticate against fingerprints registered for the device.
     * @param {AFAAuthOptions} options Options
     * @returns {Promise<AFAEncryptResponse>}
     */
    AndroidFingerprintAuth.prototype.encrypt = function (options) {
        return;
    };
    /**
     * Opens a native dialog fragment to use the device hardware fingerprint scanner to authenticate against fingerprints registered for the device.
     * @param {AFAAuthOptions} options Options
     * @returns {Promise<AFADecryptOptions>}
     */
    AndroidFingerprintAuth.prototype.decrypt = function (options) {
        return;
    };
    /**
     * Check if service is available
     * @returns {Promise<AFAAvailableResponse>} Returns a Promise that resolves if fingerprint auth is available on the device
     */
    AndroidFingerprintAuth.prototype.isAvailable = function () {
        return;
    };
    /**
     * Delete the cipher used for encryption and decryption by username
     * @param {AFADeleteOptions} options Options
     * @returns {Promise<{ deleted: boolean }>} Returns a Promise that resolves if the cipher was successfully deleted
     */
    AndroidFingerprintAuth.prototype.delete = function (options) {
        return;
    };
    AndroidFingerprintAuth.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AndroidFingerprintAuth.ctorParameters = function () { return []; };
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AndroidFingerprintAuth.prototype, "encrypt", null);
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AndroidFingerprintAuth.prototype, "decrypt", null);
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], AndroidFingerprintAuth.prototype, "isAvailable", null);
    __decorate([
        Cordova(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], AndroidFingerprintAuth.prototype, "delete", null);
    AndroidFingerprintAuth = __decorate([
        Plugin({
            pluginName: 'AndroidFingerprintAuth',
            plugin: 'cordova-plugin-android-fingerprint-auth',
            pluginRef: 'FingerprintAuth',
            repo: 'https://github.com/mjwheatley/cordova-plugin-android-fingerprint-auth',
            platforms: ['Android']
        })
    ], AndroidFingerprintAuth);
    return AndroidFingerprintAuth;
}(IonicNativePlugin));
export { AndroidFingerprintAuth };
//# sourceMappingURL=index.js.map