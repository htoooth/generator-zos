import { ui, log } from './<%- pageName %>.vender'
<%_ if (layout) { _%>
import * as view from './<%- pageName %>.layout/index'
<%_ } _%>
import * as style from './<%- pageName %>.style'

const layout = {
  <%_ if (layout) { _%>
  $childLayout: view,
  <%_ } _%>
  $refs: {},
  render(vm) {
    <%_ if (layout) { _%>
    view.layout.render(vm)

    <%_ } _%>
    this.$refs.txt1 = ui.createWidget(ui.widget.TEXT, style.TEXT_STYLE)

    this.$refs.btn1 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE,
      click_func: () => {
        this.clickMe()
      },
    })

    this.$refs.btn2 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE2,
      click_func: () => {
        vm.click()
      },
    })

    this.$refs.btn3 = ui.createWidget(ui.widget.BUTTON, {
      ...style.BTN_STYLE3,
      click_func: () => {
        vm.clickBack()
      },
    })
  },

  clickMe() {
    layout.$refs.txt1.setProperty(ui.prop.MORE, {
      color: 0xff0000,
      text: 'click',
    })

    log.log('click me')
  },
}

const methods = {
  updateText(text) {
    log.log('click me again')
    layout.$refs.txt1.setProperty(ui.prop.MORE, {
      color: 0xff0000,
      text,
    })
  }
}

export {
  layout,
  style,
  methods,
}
