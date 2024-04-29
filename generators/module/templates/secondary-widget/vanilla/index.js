import { log } from '@zos/utils'

SecondaryWidget({
  state: {
    title: 'Zepp OS'
  },

  onInit() {
    log.log('secondary-widget onInit invoked')
  },

  onResume() {
    log.log('secondary-widget onResume invoked')
  },

  build() {
    log.log('secondary-widget build invoked')
  },

  onPause() {
    log.log('secondary-widget onPause invoked')
  },

  onDestroy() {
    log.log('secondary-widget onDestroy invoked')
  },
})
