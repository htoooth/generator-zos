import { BaseApp } from '@zeppos/zml/base-app'

App(
  BaseApp({
    name: 'main.app',
    globalData: {
    },
    onCreate() {
      this.log('app on create invoke')
    },
    onDestroy() {
      this.log('app on destroy invoke')
    },
  }),
)
