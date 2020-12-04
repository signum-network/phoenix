module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "globals": {
    "ts-jest": {
      "diagnostics": false
    }
  },
  "testPathIgnorePatterns": [
      "helpers",
      ".*\\.e2e\\.ts$",
      "out",
      "node_modules"
  ],
  "verbose": true
};


