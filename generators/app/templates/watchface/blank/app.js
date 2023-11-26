import './shared/device-polyfill'

const logger = Logger.getLogger('<%- appName %>')

App({
  globalData: {},
  onCreate(options) {
    logger.log("app create")
  },
  onDestroy(options) {
    logger.log("app destroy")
  }
})
