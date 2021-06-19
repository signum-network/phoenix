# Environment Setup for Linux

> Only suitable for Android development

The setup follows widely the default setup for [React Native Development](https://reactnative.dev/docs/environment-setup)

> This project does not use Expo, but the React Native CLI

## Install Prerequisites

Install NodeJS - (12 or newer, recommend to use [nvm](https://github.com/nvm-sh/nvm)
Install [OpenJDK](http://openjdk.java.net/)
Install [Watchman](https://facebook.github.io/watchman/docs/install.html#linux-and-macos)

### Install Android Studio

Install [Android Studio](https://developer.android.com/studio/install?authuser=1#linux), 

> Do not forget to install the required shared libs mentioned in the installation guide!

Then you need to configure your ANDROID_HOME environment:

For standard bash you can make `~/.bash_profile` (or `~/.bash`) and put next lines:
```
export ANDROID_HOME=~/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Run `source ~/.bash_profile` to apply the new paths

Then start Android Studio

### Setup Android SDK and Emulation Device

Next, you need to setup the correct SDK and create an emulation device:

In SDK Manager choose Android 10.0 (Q) and show package details. Select the SDK itself and check `Google APIs Intel x86 Atom System Image`. Then install and wait.
Once ready add/create the emulation device, select a  phone device of your choice and assign the SDK 10(Q) to it.

## Development

Open the project in Android Studio, 
go to the terminal and in path `./phoenix/mobile` run `npm i` to install all dependencies.

You should be able to run `npm start` without issues, which will start:

- React Native Metro Server
- React Native Developer Tools
- Starts the Mobile Emulator
- Builds and run the app 

 