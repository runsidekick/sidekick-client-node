const axios = require("axios");
const common = require("../common.js");

class SidekickApi {
  /**
   * @param {string} apiKey - Your sidekick project's apikey
   * @param {string} authToken - Your auth token from sidekick
   * @param {string} sidekickHost
   */
  constructor({ apiKey, authToken }, sidekickHost = common.SIDEKICK_HOST) {
    this.sidekickHost = sidekickHost;
    this.apiKey = apiKey;
    this.authToken = authToken;
  }

  /**
   * @param {object} tracepointLocation - Tracepoint information to be removed
   * @param {string} tracepointLocation.fileName - Full name of file in version control
   * @param {number} tracepointLocation.line - Line of tracepoint
   * @param {string} tracepointLocation.email - Your sidekick email
   */
  removeTracepoint(tracepointLocation) {
    return this.#removePoint(common.TRACEPOINT_ENDPOINT, tracepointLocation);
  }

  /**
   * @param {object} logpointLocation - Logpoint information to be removed
   * @param {string} logpointLocation.fileName - Full name of file in version control
   * @param {number} logpointLocation.line - Line of tracepoint
   * @param {string} logpointLocation.email - Your sidekick email
   */
  removeLogpoint(logpointLocation) {
    return this.#removePoint(common.LOGPOINT_ENDPOINT, logpointLocation);
  }

  /**
   *
   * @param {object} params
   * @param {object} params.applicationFilters -wrong doc for now !!!!
   * @param {string} params.applicationFilters.name
   * @param {string} params.applicationFilters.version
   * @param {string} params.applicationFilters.stage
   * @param {Array=} params.applicationFilters.customTags
   *
   * @param {string} params.fileName
   * @param {number} params.lineNo
   * @param {number=} params.expireSecs
   * @param {number=} params.expireCount
   * @param {boolean=} params.enableTracing
   * @param {boolean=} params.persist
   */
  putTracepoints(params) {
    return this.#createPoint(common.TRACEPOINT_ENDPOINT, params);
  }

  /**
   *
   * @param {object} params
   * @param {object} params.applicationFilters - wrong doc for now !!!!
   * @param {string} params.applicationFilters.name
   * @param {string} params.applicationFilters.version
   * @param {string} params.applicationFilters.stage
   * @param {Array=} params.applicationFilters.customTags
   *
   * @param {string} params.fileName
   * @param {number} params.lineNo
   * @param {string|""} params.logExpression
   * @param {number=} params.expireSecs
   * @param {number=} params.expireCount
   * @param {boolean=} params.enableTracing
   * @param {boolean=} params.persist
   */
  putLogpoint(params) {
    return this.#createPoint(common.LOGPOINT_ENDPOINT, params);
  }

  #createHeaders({isPost}) {
    let headers = {
      ApiKey: this.apiKey,
      Authorization: "Token " + this.authToken,
      "Content-Type": isPost ? "application/json" : "text/plain",
    };
    return headers;
  }

  async #createPoint(endpoint, params) {
    let config = {
      headers: this.#createHeaders({isPost:true}),
    };
    await axios
      .post(this.sidekickHost + endpoint, params, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async #removePoint(endpoint, tracepointLocation) {
    let config = {
      headers: this.#createHeaders({isPost:false}),
      data:
        tracepointLocation.fileName +
        "::" +
        tracepointLocation.line +
        "::" +
        tracepointLocation.email,
    };
    await axios
      .delete(this.sidekickHost + endpoint, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = {
  SidekickApi,
};
