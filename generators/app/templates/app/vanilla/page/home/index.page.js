import { log } from '@zos/utils'
import { layout } from './index.layout'

Page({
  state: {},
  onInit() {
    log.log('page onInit invoked')
  },

  build() {
    // TODO: your ui
    layout.render(this)
    log.log('page build invoked')
  },

  onBtn1ClickHandler() {
    log.log('click btn1')
  },

  onBtn2ClickHandler() {
    log.log('click btn2')
  },

  onDestroy() {
    log.log('page onDestroy invoked')
  },
})
