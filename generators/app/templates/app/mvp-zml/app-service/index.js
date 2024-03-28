import { Time } from '@zos/sensor'
import { notify } from '@zos/notification'
import { BasePage } from '@zeppos/zml/base-page'
import ble from '@zos/ble'
import { qs } from '@zos/utils'

const timeSensor = new Time()

AppService(
  BasePage({
    name: 'index.app-service',
    state: {},
    onInit(e) {
      this.log('bg-service-run')
      timeSensor.onPerMinute(() => {
        this.request({
          method: 'bgService.read',
          params: {
            test1: 'bg.service',
          },
        })
          .then((result) => {
            this.log('bg.service=>', result)
          })
          .catch(() => {
            notify({
              title: '请求超时',
              content: '请求超时',
            })
          })
      })

      ble.addListener((status) => {
        if (status) {
          notify({
            title: '蓝牙重新连接成功',
            content: '蓝牙重新连接成功',
            actions: [],
          })
        } else {
          notify({
            title: '蓝牙断开',
            content: '蓝牙断开',
            actions: [],
          })
        }
      })
    },

    onEvent(e) {
      const event = qs.parse(e)
      this.log('onEvent=', e)
      this.log('onEvent=', event)
    },

    onDestroy() {},
  }),
)
