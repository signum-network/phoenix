# BURST Javascript Lib

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/burst-apps-team/phoenix.svg?branch=develop)](https://travis-ci.org/burst-apps-team/phoenix) 
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)


This library provides common functionalities used by all platforms.

## Installation

```
npm install && npm run bootstrap
```

That's it!


## Running Tests

1. Single test run `npm run test`
2. Run in watch mode `npm run test:watch` 
3. Run end-to-end test `npm run test:e2e` 
| Keep in mind that these tests are slow as they run against true servers. And therefore, it cannot be guaranteed that all E2E tests always work

## Documentation

- To generate docs: `npm run doc`
- To update the README.md files: `lerna run readme`
