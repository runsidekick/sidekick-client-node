const axios = require('axios');
const common = require('../common.js');


class SidekickApi{

    

    /**
     * @param {string} apiKey - Your sidekick project's apikey
     * @param {string} authToken - Your auth token from sidekick
     * @param {string} sidekickHost 
     */
    constructor({apiKey, authToken},sidekickHost=common.SIDEKICK_HOST){
        this.sidekickHost=sidekickHost;
        this.apiKey=apiKey;
        this.authToken=authToken
    }



    /**
     * @param {object} tracepointLocation - Tracepoint information to be removed
     * @param {string} tracepointLocation.fileName - Full name of file in version control
     * @param {number} tracepointLocation.line - Line of tracepoint
     * @param {string} tracepointLocation.email - Your sidekick email
     */
    removeTracepoint (tracepointLocation) {
          return this.#removePoint(common.TRACEPOINT_ENDPOINT,tracepointLocation)
    }

    /**
    * @param {object} logpointLocation - Logpoint information to be removed
    * @param {string} logpointLocation.fileName - Full name of file in version control
    * @param {number} logpointLocation.line - Line of tracepoint
    * @param {string} logpointLocation.email - Your sidekick email
    */
    removeLogpoint = function (logpointLocation) {
        return this.#removePoint(common.LOGPOINT_ENDPOINT,logpointLocation)
    }



    #createHeaders() {
        return {  
            "ApiKey" : this.apiKey,
            "Authorization": "Token "+this.authToken,
            'Content-Type' : 'text/plain'
        };
      }

      #removePoint(endpoint,tracepointLocation){
        let config = {
            headers: this.#createHeaders(),
            data: tracepointLocation.fileName+"::"+tracepointLocation.line+"::"+tracepointLocation.email
          }
          axios.delete(this.sidekickHost + endpoint,  config)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(error => {
            console.error(error);
        });
      }
}



var putTracepoints= function ({auth,params}) {
  
}


var putLogpoint = function (params) {
 
}



var getTracepoints = function (auth,params) {
 
}

var getLogpoints = function (params) {
 
}
module.exports = {
    SidekickApi
  };

function sidekickPost(endpoint,params){
    axios
    .post(SIDEKICK_HOST+endpoint, params)
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(error => {
        console.error(error);
    });
}
function sidekickPost(endpoint,params){
    axios
    .post(SIDEKICK_HOST+endpoint, params)
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(error => {
        console.error(error);
    });
}




