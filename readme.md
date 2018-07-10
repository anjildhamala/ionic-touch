Installation
```
npm install https://github.com/anjildhamala/ionic-touch.git
```

Additional Installations
Ionic Native & Cordova Plugins
```
Android Fingerprint https://ionicframework.com/docs/native/android-fingerprint-auth/
IOS Touch https://ionicframework.com/docs/native/touch-id/
Secure Storage https://ionicframework.com/docs/native/secure-storage/
```

Usage
Add the TouchModule to your App Module's imports as in

```
import {TouchModule} from 'ionic-touch-module';

@NgModule()
export class AppModule {
imports: [TouchModule]
}
```

Inject the TouchDriver in your service or component wherever you want to set up your touch logic.
```
constructor(private touchDriver: TouchDriver){}
```

There are only 3 public methods to use from this library.

```
isAvailable(): Promise<string>;
```
It returns a promise that resolves or rejects with a string that describes the availability.

```
save(param1, param2): Promise<any>;
```
This method takes two params to encrypt, save, retrieve and decrypt. For my specific purpose, I used it to save username and password. It could store any two params that may or may not have any relationship between each other.

```
retrieve(): Promise<any>;
```
It retrieves the saved two strings after an appropriate (TouchID, FaceID or pin) authentication.

All the errors that are thrown from the module can be viewed in the source code under src/constants

Quick Test:
In your app.component.ts, inject TouchDriver and then copy paste the following:

```
this.touchDriver.isAvailable()
.then(() => this.save('firstname', 'lastname'))
.then(() => this.retrieve())
.then((response) => { 
//This will report as such: {user:'firstname', pass: 'lastname'}
    console.log(response)
})
.catch((error) => { console.log(error) });
```

One Final Piece:
You might need to include
```
"node_modules/ionic-touch-module"
```
in your
```
tsconfig "include"
```
as I wasn't quite sure how to make it typescript compatible.
