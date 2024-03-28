import { log } from '@zos/utils'
import { style } from './index.layout'

DataWidget({
  state: {},
  onInit() {
    log.log('page onInit invoked')
  },

  build() {
    // TODO: your ui
    log.log('page build invoked')
  },

  onDestroy() {
    log.log('page onDestroy invoked')
  },
})
