import { log } from '@zos/utils'
import { layout } from './index.layout'
import { push } from './index.layout/vender'

Page({
  state: {
    title: 'Zepp OS'
  },
  onInit() {
    log.log('page onInit invoked')
  },

  build() {
    log.log('page build invoked')
    layout.render(this)
  },

  onDestroy() {
    log.log('page onDestroy invoked')
  },

  onBtn1ClickHandler() {
    push({
      index: 1
    })
  }
})
