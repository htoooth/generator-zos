import { log } from '@zos/utils'

AppService({
  onInit(e) {
    log.log('app-service onInit invoked', e)
  },

  onEvent(e) {
    log.log('app-service onEvent invoked', e)
  },

  onDestroy() {
    log.log('app-service onDestroy invoked')
  },
})
