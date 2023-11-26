import { BaseSideService } from '@zeppos/zml/base-side'

AppSideService(
  BaseSideService({
    name: 'index.side-service',
    state: {},
    onInit() {
      this.log('app side service invoke onInit')
    },
    onRun() {
      this.log('app side service invoke onRun')
    },
    onDestroy() {
      this.log('app side service invoke onDestroy')
    },
    onReceivedFile(file) {},
    onRequest(req, res) {},
    onCall(req) {},
    onSettingsChange({ key, newValue, oldValue }) {},
  }),
)
