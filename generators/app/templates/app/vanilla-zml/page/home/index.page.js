import { style } from './index.layout'
import { BasePage } from '@zeppos/zml/base-page'

Page(
  BasePage({
    name: 'index.page',
    state: {},
    onInit() {
      this.log('page onInit invoked')
    },

    build() {
      this.log('page build invoked')
      // your ui code
    },

    onDestroy() {
      this.log('page onDestroy invoked')
    },
  }),
)
