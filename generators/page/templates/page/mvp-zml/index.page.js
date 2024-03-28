import { push } from './index.vender'
import * as pageView from './index.layout'
import { BasePage } from '@zeppos/zml/base-page'

Page(
  BasePage({
    name: '<%- pageName %>.page',
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

    onBtn1ClickHandler() {
      pageView.layout.updateTitle('click')
    },

    onBtn2ClickHandler() {
      pageView.layout.updateTitle('clickAgain')
    },

    onBtn3ClickHandler() {
      push({
        index: 1,
      })
    },
  }),
)
