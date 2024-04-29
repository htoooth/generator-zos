import { log } from '@zos/utils'

AppWidget({
  state: {
    title: 'Zepp OS'
  },

  onInit() {
    log.log('app-widget onInit invoked')
  },

  onResume() {
    log.log('app-widget onResume invoked')
  },

  build() {
    log.log('app-widget build invoked')
  },

  onPause() {
    log.log('app-widget onPause invoked')
  },

  onDestroy() {
    log.log('app-widget onDestroy invoked')
  },
})
