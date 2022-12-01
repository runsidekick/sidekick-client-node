const common = require("../common.js");
const { v4: uuidv4 } = require('uuid');
const WebSocketClient = require('websocket').client;

const reconnectInterval = 10000;

const onTrigger = (clientInfo) => {
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

  const connect = () => {
    let url;
    if (token) {
      url = `${sidekickHost}:${sidekickPort}/client/${token}`;
    } else {
      url = `${sidekickHost}:${sidekickPort}/client/${email}/${password}`;
    }

    const ws = new WebSocketClient();

    ws.on("connect", (connection) => {

      connection.on('error', (error) => {
        console.log("Connection Error: " + error.toString());
        setTimeout(connect, reconnectInterval);
      });

      connection.on('close', ()  => {
        console.log("Sidekick broker connection : closed.");
        setTimeout(connect, reconnectInterval);
      });

      connection.on('message', function(message) {
        if (message.type === 'utf8') {
          const data = message.utf8Data;
          console.log(`Received: ${data}`);
          let dataJSON = { name: "" };
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

            }else if (dataJSON.name === "ErrorStackSnapshotEvent") {

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
        }
      });

      const enableCollaboration = () => {
        if (connection.connected) {
          const message = {"type":"Request","name":"ListApplicationsRequest","id":"c27ba8c7-c457-4236-89c3-430203577af5","applicationNames":[],"applicationStages":[],"applicationVersions":[]};
          try {
            connection.send(JSON.stringify({"type":"Request","name":"EnableCollaborationRequest","id":uuidv4()}));
          } catch (e) {
            console.error(e);
          }
        }
      }

      enableCollaboration();


      console.log("Sidekick broker connection : successful");
    });

    ws.connect(url);
  };

  connect();
};

module.exports = {
  onTrigger
};
