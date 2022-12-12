const axios = require("axios");
const common = require("../common.js");

class SidekickApi {
    /**
     * @param {string} apiKey - Your sidekick project's apikey
     * @param {string} apiToken - Your auth token from sidekick
     * @param {string} sidekickHost
     * @param {string} sidekickPort
     */
    constructor({apiKey, apiToken}, sidekickHost = common.SIDEKICK_API_HOST, sidekickPort = common.SIDEKICK_API_PORT) {
        this.sidekickHost = sidekickHost + ':' + sidekickPort;
        this.apiKey = apiKey;
        this.apiToken = apiToken;
    }


    /**
     *
     * @param {Map} filters
     * @returns {Array}
     */
    async getAllApplications(params) {
        const config = {
            headers: this._createHeaders({isPost: true}),
        };
        return axios
            .post(this.sidekickHost + common.APPLICATIONS_ENDPOINT, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*                  TRACE POINTS               */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     * @returns {Array<Map>} List of Tracepoints
     */
    getAllTracepoints() {
        return this._getPoints(common.TRACEPOINT_ENDPOINT)

    }

    /**
     * Create a tracepoint
     * @param {object} params
     * @param {Array.<{name: String, version: String, stage: String, customTags=: Array}>} params.applicationFilters - The properties of app that you are running
     *
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of tracepoint
     * @param {number=} params.expireSecs - Expire time of breakpoint in seconds
     * @param {number=} params.expireCount - Hitcount of breakpoint
     * @param {boolean=} params.enableTracing
     * @param {boolean=} params.persist
     * @param {string=} params.probeName
     * @param {Array<string>=} params.tags
     */
    putTracepoint(params) {
        return this._createPoint(common.TRACEPOINT_ENDPOINT, params);
    }

    /**
     * Remove existing tracepoint from a file
     * @param {object} tracepointLocation - Tracepoint information to be removed
     * @param {string} tracepointLocation.fileName - Full name of file in version control
     * @param {number} tracepointLocation.line - Line of tracepoint
     * @param {string} tracepointLocation.email - Your sidekick email
     */
    removeTracepoint(tracepointLocation) {
        return this._removePoint(common.TRACEPOINT_ENDPOINT, tracepointLocation);
    }

    /**
     * Disable existing tracepoint
     * @param {object} tracepointLocation - Tracepoint information to be disabled
     * @param {string} tracepointLocation.fileName - Full name of file in version control
     * @param {number} tracepointLocation.line - Line of tracepoint
     * @param {string} tracepointLocation.email - Your sidekick email
     */
    disableTracepoint(tracepointLocation) {
        return this._togglePoint(common.TRACEPOINT_ENDPOINT, true, tracepointLocation);
    }

    /**
     * Enable existing tracepoint
     * @param {object} tracepointLocation - Tracepoint information to be enabled
     * @param {string} tracepointLocation.fileName - Full name of file in version control
     * @param {number} tracepointLocation.line - Line of tracepoint
     * @param {string} tracepointLocation.email - Your sidekick email
     */
    enableTracepoint(tracepointLocation) {
        return this._togglePoint(common.TRACEPOINT_ENDPOINT, false, tracepointLocation);
    }

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*                  LOG POINTS                 */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     * @returns {Array<Map>} List of Logpoints
     */
    getAllLogpoints() {
        return this._getPoints(common.LOGPOINT_ENDPOINT)
    }

    /**
     *
     * @param {object} params
     * @param {Array.<{name: String, version: String, stage: String, customTags: Array}>} params.applicationFilters - The properties of app that you are running
     *
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of logpoint
     * @param {string} params.logExpression - Expression for log
     * @param {number=} params.expireSecs - Expire time of breakpoint in seconds
     * @param {number=} params.expireCount - Hitcount of breakpoint
     * @param {boolean=} params.enableTracing
     * @param {boolean=} params.persist
     * @param {string=} params.probeName
     * @param {Array<string>=} params.tags
     */
    putLogpoint(params) {
        return this._createPoint(common.LOGPOINT_ENDPOINT, params);
    }

    /**
     * Remove existing logpoint from a file
     * @param {object} logpointLocation - Logpoint information to be removed
     * @param {string} logpointLocation.fileName - Full name of file in version control
     * @param {number} logpointLocation.line - Line of logpoint
     * @param {string} logpointLocation.email - Your sidekick email
     */
    removeLogpoint(logpointLocation) {
        return this._removePoint(common.LOGPOINT_ENDPOINT, logpointLocation);
    }

    /**
     * Disable existing logpoint
     * @param {object} logpointLocation - Logpoint information to be disabled
     * @param {string} logpointLocation.fileName - Full name of file in version control
     * @param {number} logpointLocation.line - Line of logpoint
     * @param {string} logpointLocation.email - Your sidekick email
     */
    disableLogpoint(logpointLocation) {
        return this._togglePoint(common.LOGPOINT_ENDPOINT, true, logpointLocation);
    }

    /**
     * Enable existing logpoint
     * @param {object} logpointLocation - Logpoint information to be enabled
     * @param {string} logpointLocation.fileName - Full name of file in version control
     * @param {number} logpointLocation.line - Line of logpoint
     * @param {string} logpointLocation.email - Your sidekick email
     */
    enableLogpoint(logpointLocation) {
        return this._togglePoint(common.LOGPOINT_ENDPOINT, false, logpointLocation);
    }

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*                  PROBE TAGS                 */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     * @returns {Array<Map>} List of ProbeTags
     */
    getAllProbeTags() {
        return this._getProbeTags(common.PROBE_TAGS_ENDPOINT);
    }

    /**
     * Disable existing probeTag
     * @param {string} tag - Tag to be disabled
     */
    disableProbeTag(tag) {
        return this._toggleTag(common.PROBE_TAGS_ENDPOINT, true, tag);
    }

    /**
     * Enable existing probeTag
     * @param {string} tag - Tag to be enabled
     */
    enableProbeTag(tag) {
        return this._toggleTag(common.PROBE_TAGS_ENDPOINT, false, tag);
    }

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*             REFERENCE EVENTS                */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     *
     * @param {object} params
     * @param {{name: String, version: String, stage: String, customTags: Array}} params.applicationFilter - The properties of app that you are running
     *
     * @param {object} params.location - Tracepoint information to be removed
     * @param {string} params.location.fileName - Full name of file in version control
     * @param {number} params.location.line - Line of tracepoint
     * @param {string} params.location.email - Your sidekick email
     */
    tracepointReferenceEvent(params) {
        return this._getReferenceEvent(common.REFERENCE_EVENT_ENDPOINT + "/tracepoint", params);
    }

    /**
     *
     * @param {object} params
     * @param {{name: String, version: String, stage: String, customTags: Array}} params.applicationFilter - The properties of app that you are running
     *
     * @param {object} params.location - Logpoint information to be removed
     * @param {string} params.location.fileName - Full name of file in version control
     * @param {number} params.location.line - Line of logpoint
     * @param {string} params.location.email - Your sidekick email
     */
    logpointReferenceEvent(params) {
        return this._getReferenceEvent(common.REFERENCE_EVENT_ENDPOINT + "/logpoint", params);
    }

    /* ------------------------------------------- */
    /* ------------------------------------------- */
    /*                EVENT HISTORY                */
    /* ------------------------------------------- */

    /* ------------------------------------------- */
    /**
     *
     * @param {object} params
     * @param {number} page
     * @param {number} size
     *
     * @param {{name: String, version: String, stage: String, customTags: Array}} params.applicationFilter - The properties of app that you are running
     * @param {string} params.type - TRACEPOINT, LOGPOINT, ERRORSNAPSHOT
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of tracepoint
     * @param {string} params.client - Your sidekick email
     * @param {string} params.probeName - Predefined Point Name
     * @param {string} params.tag - Predefined Point Tag
     * @param {boolean} params.withEventData - Get Event Data
     * @param {date} params.startDate - Date Range Start Date
     * @param {date} params.endDate - Date Range End Date
     */
    listEventHistory(page, size, params) {
        return this._getEventHistory(common.EVENT_HISTORY_ENDPOINT, page, size, params);
    }

    /**
     *
     * @param {object} params
     * @param {{name: String, version: String, stage: String, customTags: Array}} params.applicationFilter - The properties of app that you are running
     *
     * @param {string} params.type - TRACEPOINT, LOGPOINT, ERRORSNAPSHOT
     * @param {string} params.fileName - Full name of file in version control
     * @param {number} params.lineNo - Line of tracepoint
     * @param {string} params.client - Your sidekick email
     * @param {string} params.probeName - Predefined Point Name
     * @param {string} params.tag - Predefined Point Tag
     * @param {boolean} params.withEventData - Get Event Data
     * @param {date} params.startDate - Date Range Start Date
     * @param {date} params.endDate - Date Range End Date
     * @param {string} params.groupBy - DAILY, HOURLY
     */
    eventHistoryMetric(params) {
        return this._eventHistoryMetric(common.EVENT_HISTORY_ENDPOINT + "/count", params);
    }

    _createHeaders({isPost}) {
        const headers = {
            ApiKey: this.apiKey,
            Authorization: "Token " + this.apiToken,
            "Content-Type": isPost ? "application/json" : "text/plain",
        };
        return headers;
    }


    async _getPoints(endpoint) {
        const config = {
            headers: this._createHeaders({isPost: false}),
        };

        return axios
            .get(this.sidekickHost + endpoint, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    async _createPoint(endpoint, params) {
        const config = {
            headers: this._createHeaders({isPost: true}),
        };
        return axios
            .post(this.sidekickHost + endpoint, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _removePoint(endpoint, pointLocation) {
        const config = {
            headers: this._createHeaders({isPost: false}),
            data: this._getPointId(pointLocation)
        };
        return axios
            .delete(this.sidekickHost + endpoint, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _togglePoint(endpoint, disable, pointLocation) {
        endpoint = `${endpoint}/${(disable ? "disable" : "enable")}`;
        const config = {
            headers: this._createHeaders({isPost: false})
        };
        return axios
            .put(this.sidekickHost + endpoint, this._getPointId(pointLocation), config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _getProbeTags(endpoint) {
        const config = {
            headers: this._createHeaders({isPost: false}),
        };

        return axios
            .get(this.sidekickHost + endpoint, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    async _toggleTag(endpoint, disable, tag) {
        endpoint += `/${(disable ? "disable" : "enable")}`;
        const config = {
            headers: this._createHeaders({isPost: true})
        };
        return axios
            .put(this.sidekickHost + endpoint, {"tag": tag}, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _getReferenceEvent(endpoint, params) {
        params.id = params.location.fileName + "::" + params.location.line + "::" + params.location.email;
        const config = {
            headers: this._createHeaders({isPost: true}),
        };
        return axios
            .post(this.sidekickHost + endpoint, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    async _getEventHistory(endpoint, page, size, params) {
        const config = {
            headers: this._createHeaders({isPost: true}),
        };
        return axios
            .post(`${this.sidekickHost}${endpoint}?page=${page}&size=${size}`, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    async _eventHistoryMetric(endpoint, params) {
        const config = {
            headers: this._createHeaders({isPost: true}),
        };
        return axios
            .post(`${this.sidekickHost}${endpoint}`, params, config)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error(error);
            });

    }

    /**
     * Enable existing pointLocation
     * @param {object} pointLocation - Point information to be enabled
     * @param {string} pointLocation.fileName - Full name of file in version control
     * @param {number} pointLocation.line - Line
     * @param {string} pointLocation.email - Your sidekick email
     */
    _getPointId(pointLocation) {
        return `${pointLocation.fileName}::${pointLocation.line}::${pointLocation.email}`;
    }

}

module.exports = {
    SidekickApi,
};
