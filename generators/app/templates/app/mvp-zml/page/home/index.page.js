import { push } from './index.vender'
import * as pageView from './index.layout'
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
      pageView.layout.render(this)
    },

    onDestroy() {
      this.log('page onDestroy invoked')
    },

    click() {
      pageView.methods.updateText('clickAgain')
    },

    clickBack() {
      push({
        index: 1,
      })
    },
  }),
)
