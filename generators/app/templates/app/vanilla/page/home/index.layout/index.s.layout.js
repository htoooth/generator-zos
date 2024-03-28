import { px, ui, DEVICE_WIDTH, getText } from './vender'

const style = {
  img1: {
    x: px(125),
    y: px(35),
    src: 'image/logo.png',
  },
  img2: {
    x: px(125),
    y: px(125),
    src: 'image/zeppos.png',
  },
  txt1: {
    x: px(125),
    y: px(360),
    h: px(50),
    w: px(300),
    text_size: px(32),
    color: 0xfc6950,
    text: getText('hi'),
  },
  btn1: {
    x: px((480 - 150) / 2),
    y: px(450),
    w: px(150),
    h: px(50),
    radius: 12,
    normal_color: 0xfc6950,
    press_color: 0xfeb4a8,
    text: getText('os_info'),
  },
  btn2: {
    x: px((480 - 150) / 2),
    y: px(530),
    w: px(150),
    h: px(50),
    radius: 12,
    normal_color: 0xfc6950,
    press_color: 0xfeb4a8,
    text: getText('app_info'),
  },
}

const method = {}

const layout = {
  $refs: {},
  render(vm) {
    ui.createWidget(ui.widget.IMG, style.img1)
    ui.createWidget(ui.widget.IMG, style.img2)

    this.$refs.title = ui.createWidget(ui.widget.TEXT, style.txt1)

    ui.createWidget(ui.widget.BUTTON, {
      ...style.btn1,
      click_func() {
        vm.onBtn1ClickHandler()
      },
    })

    ui.createWidget(ui.widget.BUTTON, {
      ...style.btn2,
      click_func() {
        vm.onBtn2ClickHandler()
      },
    })
  },

  updateTitle(text) {
    this.$refs.title.setProperty(ui.prop.MORE, {
      color: 0xff0000,
      text,
    })
  },
}

export { layout, style, method }
