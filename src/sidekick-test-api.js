const axios = require("axios");
const common = require("../common.js");

class SidekickTestApi {
    /**
     * @param {string} apiKey - Your sidekick test mode apikey
     * @param {string} sidekickTestModeHost
     * @param {string} sidekickTestModePort
     */
    constructor({apiKey}, sidekickTestModeHost = common.SIDEKICK_TEST_MODE_HOST, sidekickTestModePort = common.SIDEKICK_TEST_MODE_PORT) {
        this.apiUrl = sidekickTestModeHost + ':' + sidekickTestModePort;
        this.apiKey = apiKey;
    }


    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*                  EVENTS                     */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     * @param {object} params
     * @param {string} params.appName - Application Name
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of tracepoint
     * @param {string=} params.probeName - Predefined Point Name
     * @returns {Array<String>} List of Events
     */
    getTracePointEvents(params) {
        return this._getEvents(`${common.TEST_MODE_EVENT_ENDPOINT}/tracepoint`, params);

    }

    /**
     * @param {string} tag - Tag
     * @param {object} params
     * @param {string} params.appName - Application Name
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of tracepoint
     * @param {string=} params.probeName - Predefined Point Name
     * @returns {Array<String>} List of Events
     */
    getTracePointEventsByTag(tag,params) {
        return this._getEventsByTag(`${common.TEST_MODE_EVENT_ENDPOINT}/tracepoint/${tag}`, params);
    }

    /**
     * @param {object} params
     * @param {string} params.appName - Application Name
     * @param {string} params.fileName - Full path of file
     * @param {number} params.lineNo - Line of logpoint
     * @param {string=} params.probeName - Predefined Point Name
     * @returns {Array<String>} List of Events
     */
    getLogPointEvents(params) {
        return this._getEvents(`${common.TEST_MODE_EVENT_ENDPOINT}/logpoint`, params);

    }

    /**
     * @param {string} tag - Tag
     * @param {object} params
     * @param {string} params.appName - Application Name
     * @param {string} params.fileName - Full path of file
     * @param {number} params.lineNo - Line of logpoint
     * @param {string=} params.probeName - Predefined Point Name
     * @returns {Array<String>} List of Events
     */
    getLogPointEventsByTag(tag,params) {
        return this._getEventsByTag(`${common.TEST_MODE_EVENT_ENDPOINT}/logpoint/${tag}`);
    }

    /**
     * @param {string} appName - Application Name
     * @returns {Array<String>} List of Events
     */
    getErrorSnapshots(appName) {
        return this._getErrorSnapshotsEvents(`${common.TEST_MODE_EVENT_ENDPOINT}/errorstack/${appName}`);
    }

    /**
     * @param {string} eventType - ERROR_STACK_SNAPSHOT, LOGPOINT, TRACEPOINT_SNAPSHOT
     */
    flush(eventType) {
        return this._flush(`${common.TEST_MODE_EVENT_ENDPOINT}/flush?eventType=${eventType}`);
    }

    /**
     */
    flushAll() {
        return this._flush(`${common.TEST_MODE_EVENT_ENDPOINT}/flushAll`);
    }

    /**
     * @param {string} probeName - Predefined Point Name
     * @param {object} params
     * @param {string} params.appName - Application Name
     * @param {string} params.fileName - Full path of file
     * @param {number} params.lineNo - Line of point
     * @returns {Array<object>} List of Events
     */
    getReferenceEvent(probeName,params) {
        return this._getReferenceEvent(`${common.TEST_MODE_EVENT_ENDPOINT}/referenceevent/${probeName}`, params);
    }

    _createHeaders() {
        const headers = {
            Authorization: "Bearer " + this.apiKey,
            "Content-Type": "application/json",
        };
        return headers;
    }

    async _getEvents(endpoint, params) {
        const config = {
            headers: this._createHeaders(),
        };

        return axios
            .post(this.apiUrl + endpoint, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _getEventsByTag(endpoint, params) {
        const config = {
            headers: this._createHeaders(),
        };

        return axios
            .post(this.apiUrl + endpoint, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _getErrorSnapshotsEvents(endpoint, params) {
        const config = {
            headers: this._createHeaders(),
        };

        return axios
            .get(this.apiUrl + endpoint, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _getReferenceEvent(endpoint, params) {
        const config = {
            headers: this._createHeaders(),
        };

        return axios
            .post(this.apiUrl + endpoint, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _flush(endpoint) {
        const config = {
            headers: this._createHeaders(),
        };

        return axios
            .post(this.apiUrl + endpoint, {}, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }


}

module.exports = {
    SidekickTestApi,
};
