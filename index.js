const { onTrigger } = require('./src/client.js')
const { SidekickApi } = require('./src/sidekick-api.js')
const { SidekickTestApi } = require('./src/sidekick-test-api.js')
module.exports = {
  onTrigger, SidekickApi, SidekickTestApi
}
