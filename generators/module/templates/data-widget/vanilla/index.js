import { log } from '@zos/utils'

DataWidget({
  state: {
    title: 'Zepp OS'
  },
  onInit() {
    log.log('data-widget onInit invoked')
  },

  build() {
    log.log('data-widget build invoked')
  },

  onDestroy() {
    log.log('data-widget onDestroy invoked')
  },
})
