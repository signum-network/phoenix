# The Phoenix Desktop Wallet

## Installation (End Users)

Download the latest release from the [Releases page](https://github.com/signum-network/phoenix/releases). Find your platform and install it. 

## Installation (Developers)

## Build and Start Desktop Wallet

You need installed globally angular-cli: `npm i @angular/cli -g`

Run the following commands to start the wallet as [electron](https://electronjs.org/) app

> You can run ./init.sh to do all the ramp up

- `cd ../../scripts`
- `npm install`
- `cd ../web/angular-wallet`
- `npm install`
- `cd ../../desktop/wallet`
- `npm install`
- `npm start`

### Arguments

| Argument | Description |
|----------|-------------|
|  --log     |  Enables Logging           |
|  --devtools     |  Enables Development Tools           |
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

`npm run release:win32` creates an .exe for windows (x86/x64)
