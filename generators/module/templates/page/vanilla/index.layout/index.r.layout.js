import { px, DEVICE_WIDTH, ui, align } from './vender'

const style = {
  txt: {
    x: px((DEVICE_WIDTH - 300) / 2),
    y: px(80),
    h: px(50),
    w: px(200),
    text_size: px(32),
    color: 0xfc6950,
    text: '-Round Screen-',
    align_h: align.CENTER_H
  },
  btn: {
    x: px((DEVICE_WIDTH - 150) / 2),
    y: px(300),
    w: px(150),
    h: px(50),
    radius: 12,
    normal_color: 0xfc6950,
    press_color: 0xfeb4a8,
    text: 'back',
  },
}

const method = {}

const layout = {
  $refs: {},
  render(vm) {
    ui.createWidget(ui.widget.TEXT, {
      ...style.txt,
      text: vm.state.title + style.txt.text
    })
    ui.createWidget(ui.widget.BUTTON, {
      ...style.btn,
      click_func() {
        vm.onBtn1ClickHandler()
      },
    })
  },
}

export { layout, style, method }
