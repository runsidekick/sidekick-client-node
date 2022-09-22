const WebSocket = require("ws");
const common = require("../common.js");
var reconnectInterval = 10000;
var ws;

var onTrigger = function (clientInfo) {
  const sidekickHost = clientInfo.sidekickHost
    ? clientInfo.sidekickHost
    : common.SIDEKICK_HOST ;
  const sidekickPort = clientInfo.sidekickPort
    ? clientInfo.sidekickPort
    : 443;
  const token = clientInfo.sidekickToken;
  const email = clientInfo.sidekickEmail;
  const password = clientInfo.sidekickPassword;
  const stdout = clientInfo.stdout;
  const tracepointFunction = clientInfo.tracepointFunction;
  const logpointFunction = clientInfo.logpointFunction;
  const errorSnapshotFunction = clientInfo.errorSnapshotFunction;

  const options = {
    headers: {
      ...(!token && { "x-sidekick-email": email }),
      ...(!token && { "x-sidekick-password": password }),
      ...(token && { "x-sidekick-token": token }),
    },
  };

  var connect = function () {
    ws = new WebSocket(
      sidekickHost + ":" + sidekickPort + "/client",
      options
    );

    ws.on("open", function open() {
      console.log("Sidekick broker connection : successful");
    });

    ws.on("message", function message(data) {
      var dataJSON = {
        name: "",
      };

      try {
        dataJSON = JSON.parse(data);
        if (dataJSON.name === "TracePointSnapshotEvent") {

          if (tracepointFunction) {
              tracepointFunction(dataJSON);
          }else{
            console.log("Tracepoint function might not be initialized")
          }

        }else if (dataJSON.name === "LogPointEvent") {
        
          if (logpointFunction) {
              logpointFunction(dataJSON);
          }else{
            console.log("Logpoint function might not be initialized")
          }
          
        }else if (dataJSON.name === "LogPointEvent") {
        
          if (logpointFunction) {
              logpointFunction(dataJSON);
          }else{
            console.log("Logpoint function might not be initialized")
          }
          
        }

        else if (dataJSON.name === "ErrorStackSnapshotEvent") {
        
          if (errorSnapshotFunction) {
              errorSnapshotFunction(dataJSON);
          }else{
            console.log("Error snapshot function might not be initialized")
          }
          
        }
        
        if (stdout) { 
              console.log("Received data from sidekick:\n ",dataJSON);
          }
      } catch(err) {
        console.log(err);
      }


    });

    ws.on("error", function (value) {
        console.log(value)
      setTimeout(connect, reconnectInterval);
    });

    ws.on("close", function () {
      console.log("Sidekick broker connection : closed.");
      setTimeout(connect, reconnectInterval);
    });
  };

  connect();
};

module.exports = {
  onTrigger
};
