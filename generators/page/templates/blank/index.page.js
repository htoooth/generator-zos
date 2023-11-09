import { log as Logger } from '@zos/utils'
import * as pageView from './<%- pageName %>.layout'

const logger = Logger.getLogger('<%- pageName %>.page')

Page({
  state: {},
  onInit() {
    logger.log('page onInit invoked')
  },

  build() {
    logger.log('page build invoked')
    pageView.layout.render(this)
  },

  onDestroy() {
    logger.log('page onDestroy invoked')
  },

  click() {
    pageView.methods.updateText('clickAgain')
  }
})
