# Signum Wallet

The Signum wallet is a JavaScript application written in Angular and TypeScript. 

## The Community

Share your ideas, discuss Burst and help each other.

[Click here](http://reddit.com/r/burstcoin) to see our Community page.

## Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` or `npm build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` or `npm test` to execute the unit tests via [Jest](https://jestjs.io/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Releasing

Just run `npm run release`

This script automates the following steps:
- Bumps to a new semantic version
- creates and pushes a tag in format `desktop-[semversion]`
- Builds Win, MacOS and Linux executables
- Builds Web version
- Attaches all to a new pre-release version in Github Releases.
Once pushed the [build pipeline](../../.github/workflows/build-release-desktop.yml) for new releases triggers. All automated 

## Using Phoenix Wallet as web version

Run `npm run build:web`. The output of `dist` is the web version.
It can be dropped into the `html/ui` folder in the BRS jar file, or served statically elsewhere. 

## Running a full node

> TODO: revisit this part as it maybe outdated in 2021

Running a full node strengthens the network and adds security. Running a full node allows one to verify transactions without trusting any third parties. To run a full node:

1. Download and configure the [Signum Node](https://github.com/signum-network/signum-core/releases).

2. Install Phoenix from source. 

    `git clone git@github.com:burst-apps-team/phoenix.git`

3. Build Phoenix Desktop with the `web` target.

    `npm run build:web`

4. Copy the files from `dist` into your BRS installation's `html/ui` folder.

    `cp dist/* [path to your BRS]/html/ui`

5. Restart BRS. Enjoy!
