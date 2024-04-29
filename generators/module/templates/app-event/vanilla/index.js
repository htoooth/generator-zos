import { log } from '@zos/utils'

AppEvent({
  state: {
    title: 'Zepp OS'
  },

  onInit(e) {
    log.log('app-event onInit invoked from event', e)
  },

  build() {
    log.log('app-event build invoked')
  },

  onDestroy() {
    log.log('app-event onDestroy invoked')
  },
})
