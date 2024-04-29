import { log } from '@zos/utils'

AppSideService({
  onInit(e) {
    log.log('app-side-service onInit invoked', e)
  },

  onRun(e) {
    log.log('app-side-service onEvent invoked', e)
  },

  onDestroy() {
    log.log('app-side-service onDestroy invoked')
  },
})
