
# Environment setup for MacOS

## for iOS

Install `XCode` 9.4+ from AppStore.
Next you need `Command Line Tools`, install them from `XCode => Preferences => Locations`

## for Android

Install `Oracle JDK 8`
Install `Android Studio`, choose `Custom setup` and check next boxes:
* Android SDK
* Android SDK Platform
* Performance (Intel HAXM)
* Android Virtual Device

Next, you need to install `Android SDK` 8.1 and select `Android SDK Platform 27` and `Google APIs Intel x86 Atom System Image`

Then you need to configure your ANDROID_HOME environment.

For standard macOS terminal you can make ~/.bash_profile and put next lines:
```
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
``` 

Then start Android Studio

### Setup Android SDK and Emulation Device

Next, you need to setup the correct SDK and create an emulation device:

In SDK Manager choose Android 10.0 (Q) and show package details. Select the SDK itself and check `Google APIs Intel x86 Atom System Image`. Then install and wait.
Once ready add/create the emulation device, select a  phone device of your choice and assign the SDK 10(Q) to it.

### General

Install `Homebrew` and `NodeJS` 12+, then run following commands
```
brew install watchman
goi
npm i
```

## Development

You should be able to run `npm start` without issues, which will start:

- React Native Metro Server
- React Native Developer Tools
- Starts the Mobile Emulator
- Builds and run the app 

 