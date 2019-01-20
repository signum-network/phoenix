# Phoenix Mobile Wallet

The BURST mobile wallet is a React Native application.

## The Community

Share your ideas, discuss Burst and help each other.

[Click here](http://reddit.com/r/burstcoin) to see our Community page.

## Development

### MacOS

#### for iOS

Install `XCode` 9.4+ from AppStore.
Next you need `Command Line Tools`, install them from `XCode => Preferences => Locations`

Run `react-native run-ios` and the simulator will start automatically.

#### for Android

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

### General

Install `Homebrew` and `NodeJS` 10+, then run following commands
```
brew install watchman
npm install -g react-native-cli
npm install
```

### Windows (untested)

#### for iOS

No, you can't.

#### for Android

First, install `Chocolatey`, a windows package manager.
Then install `NodeJS`, `python 2` and `JDK 8`:
```
choco install -y nodejs.install python2 jdk8
```

Install `Android Studio`, choose `Custom setup` and check next boxes:
* Android SDK
* Android SDK Platform
* Performance (Intel HAXM)
* Android Virtual Device

Next, you need to install `Android SDK` 8.1 and select `Android SDK Platform 27` and `Google APIs Intel x86 Atom System Image`

Then you need to configure your ANDROID_HOME environment.

Open `System and Security` -> `Change Settings` -> `Advanced` -> `Environment variables` -> `New`, where `name` is `ANDROID_HOME` and value is `path\to\your\android\sdk`
By default it's `c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`

#### General

Run the following commands:
```
npm install -g react-native-cli
npm install
```

### *nix systems (untested)

#### for iOS

No, you can't

#### for Android

Install `NodeJS` 10+, `Oracle JDK 8`, `Android Studio` with checkboxes:
* Android SDK
* Android SDK Platform
* Android Virtual Device

Next, you need to install `Android SDK` 8.1 and select `Android SDK Platform 27` and `Google APIs Intel x86 Atom System Image`

Then you need to configure your `ANDROID_HOME` environment.
Add the following lines to your `~/.bash_profile` config file:
```
export ANDROID_HOME=~/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then compile and install `Watchman` with [guide](https://facebook.github.io/watchman/docs/install.html#installing-from-source).

#### General

Run the following commands:
```
npm install -g react-native-cli
npm install
``` 

## Development server

Run `react-native run-ios` for a iOS dev server and `react-native run-android` for Android. The simulator will start automatically.