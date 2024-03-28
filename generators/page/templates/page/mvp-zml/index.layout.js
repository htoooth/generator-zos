import { ui, log } from './index.vender'
import * as view from './index.layout/index'
import * as style from './index.style'

const layout = {
  $childLayout: view,
  $refs: {},
  render(vm) {
    this.$refs.txt1 = ui.createWidget(ui.widget.TEXT, style.TEXT_STYLE)

    this.$refs.btn1 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE,
      click_func: () => {
        log.log('click btn1')
        vm.onBtn1ClickHandler()
      },
    })

    this.$refs.btn2 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE2,
      click_func: () => {
        log.log('click btn2')
        vm.onBtn2ClickHandler()
      },
    })

    this.$refs.btn3 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE3,
      click_func: () => {
        log.log('click btn3')
        vm.onBtn3ClickHandler()
      },
    })
  },

  updateTitle(text) {
    this.$refs.txt1.setProperty(ui.prop.MORE, {
      color: 0xff0000,
      text,
    })
  }
}

const methods = {
}

export {
  layout,
  style,
  methods,
}
