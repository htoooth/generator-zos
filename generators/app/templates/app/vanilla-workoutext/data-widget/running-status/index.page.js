import { log } from '@zos/utils'
import { layout } from './index.layout'

DataWidget({
  state: {},
  onInit() {
    log.log('data-widget onInit invoked')
  },

  build() {
    layout.render(this)
    log.log('data-widget build invoked')
  },

  onDestroy() {
    log.log('data-widget onDestroy invoked')
  },
})
