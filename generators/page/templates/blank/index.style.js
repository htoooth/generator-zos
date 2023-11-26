import { ui, px, DEVICE_WIDTH, getText } from './<%- pageName %>.vender'

export const TEXT_STYLE = {
  text: '<%- pageName %>',
  x: px(42),
  y: px(100),
  w: DEVICE_WIDTH - px(42) * 2,
  h: px(100),
  color: 0xff00ff,
  text_size: px(20),
  align_h: ui.align.CENTER_H,
  text_style: ui.text_style.WRAP,
}

export const BTN_STYLE = {
  ...TEXT_STYLE,
  y: TEXT_STYLE.y + px(100),
  text: 'click me2',
}

export const BTN_STYLE2 = {
  ...BTN_STYLE,
  y: BTN_STYLE.y + px(100),
  text: 'click me2',
}

export const BTN_STYLE3 = {
  ...BTN_STYLE2,
  y: BTN_STYLE2.y + px(100),
  text: 'back',
}
