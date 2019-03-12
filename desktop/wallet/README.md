# The Phoenix Desktop Wallet


## Build and Start Desktop Wallet

Run the following commands to start the wallet as [electron](https://electronjs.org/) app

1. `npm install`
2. `cd ../../scripts`
3. `npm install` 
4. `cd ../web/angular-wallet`
5. `npm install` 
6. `cd ../../desktop/wallet`
7. `npm start` 

## Create Desktop Wallet Executable for Deployment

To create a platform dependent executable run step 1 to 6 (if not already done)
and then run

`npm run release:<platform>`, where `platform` can be one of 

- win32
- linux
- macos

The executable will be written into `./release-builds`

_Example_:

`npm release:win32` creates an .exe for windows (x86/x64)
