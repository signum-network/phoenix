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


## Code Signing

With `electron-builder` it is sufficient to set the env vars `CSC_LINK` (path to .pfx file) and `CSC_KEY_PASSWORD` and then run the win32 build script.
There is a bash script example called `build-and-sign-win32.sh.example` as a template.


## Using OSSLSIGNCODE

Recently, I had problems with code signing using electron-builder. An additional signing script is `sign-win32.sh` which makes use of
`osslsigncode`

> We use a pfx/pkcs12 cert file

### Install OSSLSIGNCODE

```bash 
sudo apt-get update -y
sudo apt-get install -y osslsigncode
```

### Sign

Make a copy of `sign-win32.sh.example` and add your certificate path and the password. Run the script _after_ you built the windows executables and
run your signing script. If all went fine your signed executables should be available under `./release-builds/signed`.


### Verify

You can verify the executables with the command:

```bash
osslsigncode verify <file>
```

