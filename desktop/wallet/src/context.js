const UpdateService = require("./updateService");
const {parseArgs} = require("./parseArgs");
const {createRealLogger, createVoidLogger} = require("./logger");
const {version, update} = require('../package.json');

class Context {
    constructor() {
        this._version = version
        this._logger = null
        this._updateService = null
        this._args = parseArgs()
    }

    getUpdateService() {
        if(!this._updateService){
            this._updateService = new UpdateService({
                currentVersion: this._version,
                ...update
            }, this.getLogger());
        }
        return this._updateService
    }

    getVersion() {
        return this._version;
    }

    getLogger() {
        if(!this._logger){
            this._logger = this.isLoggingEnabled()
                ? createRealLogger()
                : createVoidLogger()
        }
        return this._logger
    }

    isLoggingEnabled() {
        return this.isDevelopmentMode() || this._args.isLoggingEnabled
    }

    isDevToolsEnabled() {
        return this.isDevelopmentMode() || this._args.isDevToolsEnabled
    }

    isDevelopmentMode() {
        return process.env.NODE_ENV === 'develop';
    }
}

module.exports = {
    context: new Context()
}
