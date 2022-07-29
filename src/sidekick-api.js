const axios = require('axios');


class SidekickApi{


    /**
     * @param {string} apiKey - Your sidekick project's apikey
     * @param {string} authToken - Your auth token from sidekick
     * @param {string} sidekickHost - Default: https://api.service.runsidekick.me
     */
    constructor({apiKey, authToken},sidekickHost="https://api.service.runsidekick.me"){
        this.sidekickHost=sidekickHost;
        this.apiKey=apiKey;
        this.authToken=authToken
    }



/**
 * @param {object} tracepointLocation - Tracepoint information to be removed
 * @param {string} tracepointLocation.file - Full name of file in version control
 * @param {number} tracepointLocation.line - Line of tracepoint
 * @param {string} tracepointLocation.email - Your sidekick email
 */

    removeTracepoint (tracepointLocation) {
          return this.#removePoint("tracepoint",tracepointLocation)
    }

    removeLogpoint = function (params) {
        return this.#removePoint("logpoint",tracepointLocation)
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
            data: tracepointLocation.file+"::"+tracepointLocation.line+"::"+tracepointLocation.email
          }
          axios.delete(this.sidekickHost+"/api/v1/"+endpoint,  config)
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




