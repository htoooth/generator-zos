import { log } from '@zos/utils'

App({
  globalData: {},
  onCreate() {
    log.log('app on create invoke')
  },
  onDestroy() {
    log.log('app on destroy invoke')
  },
})
