# The Phoenix Desktop Wallet

## Installation (End Users)

Download the latest release from the [Releases page](https://github.com/burst-apps-team/phoenix/releases). Find your platform and install it. 

## Installation (Developers)

## Running the latest release (Linux)
```console
$ wget https://github.com/burst-apps-team/phoenix/releases/download/desktop-1.0.0-beta.13/linux-phoenix-burst-wallet.1.0.0-beta.13.tar.gz
$ tar zxvf linux-phoenix-burst-wallet.1.0.0-beta.13.tar.gz
$ cd linux-phoenix-burst-wallet.1.0.0-beta.13/
```
```console
$ sudo chown root:root ./chrome-sandbox
$ sudo chmod 4755 ./chrome-sandbox
$ ./phoenix
```

## Build and Start Desktop Wallet

You need installed globally angular-cli: `npm i @angular/cli -g`

Run the following commands to start the wallet as [electron](https://electronjs.org/) app

1. `cd lib`
2. `npm install`
3. `npm run bootstrap`
4. `cd ../web/angular-wallet`
5. `npm install`
6. `cd ../../scripts`
7. `npm install`
8. `cd ../desktop/wallet`
9. `npm install`
10. `npm start`


### Arguments

| Argument | Description |
|----------|-------------|
|  --log     |  Enables Logging           |
|          |             |
|          |             |

## Create Desktop Wallet Executable for Deployment

To create a platform dependent executable run step 1 to 9 (if not already done)
and then run

`npm run release:<platform>`, where `platform` can be one of 

- all (builds for all platforms)
- win32
- linux
- macos

The executable will be written into `./release-builds`

| To build win32 on linux you need wine installed, additionally npm must be installed, too

_Example_:

`npm release:win32` creates an .exe for windows (x86/x64)
