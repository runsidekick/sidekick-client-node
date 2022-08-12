const axios = require("axios");
const common = require("../common.js");

class SidekickApi {
  /**
   * @param {string} apiKey - Your sidekick project's apikey
   * @param {string} authToken - Your auth token from sidekick
   * @param {string} sidekickHost
   */
  constructor({ apiKey, authToken }, sidekickHost = common.SIDEKICK_API_HOST) {
    this.sidekickHost = sidekickHost;
    this.apiKey = apiKey;
    this.authToken = authToken;
  }


/**
 * @returns {Array<Map>} List of Tracepoints
 */
  getAllTracepoints(){
    return this.#getPoints(common.TRACEPOINT_ENDPOINT)

  }
/**
 * @returns {Array<Map>} List of Logpoints
 */
  getAllLogpoints(){
      return this.#getPoints(common.LOGPOINT_ENDPOINT)
  }

  /**
   * Remove existing tracepoint from a file
   * @param {object} tracepointLocation - Tracepoint information to be removed
   * @param {string} tracepointLocation.fileName - Full name of file in version control
   * @param {number} tracepointLocation.line - Line of tracepoint
   * @param {string} tracepointLocation.email - Your sidekick email
   */
 removeTracepoint(tracepointLocation,) {
    return this.#removePoint(common.TRACEPOINT_ENDPOINT, tracepointLocation);
  }

  /**
   * Remove existing logpoint from a file
   * @param {object} logpointLocation - Logpoint information to be removed
   * @param {string} logpointLocation.fileName - Full name of file in version control
   * @param {number} logpointLocation.line - Line of tracepoint
   * @param {string} logpointLocation.email - Your sidekick email
   */
  removeLogpoint(logpointLocation) {
    return this.#removePoint(common.LOGPOINT_ENDPOINT, logpointLocation);
  }


  /**
   * Create a tracepoint
   * @param {object} params
   * @param {Array.<{name: String, version: String, stage: String, customTags: Array}>} params.applicationFilters - The properties of app that you are running
   *
   * @param {string} params.fileName - Full name of file in version control
   * @param {number} params.lineNo - Line of tracepoint
   * @param {number=} params.expireSecs - Expire time of breakpoint in seconds
   * @param {number=} params.expireCount - Hitcount of breakpoint
   * @param {boolean=} params.enableTracing
   * @param {boolean=} params.persist
   */
  putTracepoints(params) {
    return this.#createPoint(common.TRACEPOINT_ENDPOINT, params);
  }

  /**
   *
   * @param {object} params
   * @param {Array.<{name: String, version: String, stage: String, customTags: Array}>} params.applicationFilters - The properties of app that you are running
   *
   * @param {string} params.fileName - Full name of file in version control
   * @param {number} params.lineNo - Line of tracepoint
   * @param {string} params.logExpression - Expression for log
   * @param {number=} params.expireSecs - Expire time of breakpoint in seconds
   * @param {number=} params.expireCount - Hitcount of breakpoint
   * @param {boolean=} params.enableTracing
   * @param {boolean=} params.persist
   */
  putLogpoint(params) {
    return this.#createPoint(common.LOGPOINT_ENDPOINT, params);
  }

  #createHeaders({isPost}) {
    const headers = {
      ApiKey: this.apiKey,
      Authorization: "Token " + this.authToken,
      "Content-Type": isPost ? "application/json" : "text/plain",
    };
    return headers;
  }


  async #getPoints(endpoint){
    const config = {
      headers: this.#createHeaders({isPost:true}),
    };

    return axios.get(this.sidekickHost+endpoint,config).
    then((res)=> {
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.error(error);
    });

  }

  async #createPoint(endpoint, params) {
    const config = {
      headers: this.#createHeaders({isPost:true}),
    };
    return axios
      .post(this.sidekickHost + endpoint, params, config)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async #removePoint(endpoint, pointLocation) {
    const config = {
      headers: this.#createHeaders({isPost:false}),
      data:
        pointLocation.fileName +
        "::" +
        pointLocation.line +
        "::" +
        pointLocation.email,
    };
    return axios
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
