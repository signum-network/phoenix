# BURST Angular Wallet

The BURST Angular wallet is a JavaScript application written in Angular and TypeScript. 

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



- Electron: Tag the release (e.g. desktop-1.0.0) and push it up. Travis will build and deploy the electron app. 
- BRS: Run `npm run build:web`. The output of `dist` can then be dropped into the `html/ui` folder in the BRS jar file, or zipped up for web. Todo: Automate this step.

## Running a full node

Running a full node strengthens the network and adds security. Running a full node allows one to verify transactions without trusting any third parties. To run a full node:

1. Download and configure the [Burst Reference Software (BRS)](https://github.com/burst-apps-team/burstcoin/releases).

2. Install Phoenix from source. 

    `git clone git@github.com:burst-apps-team/phoenix.git`

3. Build Phoenix Desktop with the `web` target.

    `npm run build:web`

4. Copy the files from `dist` into your BRS isntallation's `html/ui` folder.

    `cp dist/* [path to your BRS]/html/ui`

5. Restart BRS. Enjoy!
