import { ui, px, DEVICE_WIDTH, getText } from './<%- pageName %>.layout/exports'

export const TEXT_STYLE = {
  text: 'hello!',
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
  text: 'click me',
  x: px(42),
  y: px(200),
  w: DEVICE_WIDTH - px(42) * 2,
  h: px(100),
  color: 0x0000ff,
  text_size: px(36),
  align_h: ui.align.CENTER_H,
  text_style: ui.text_style.WRAP,
}

export const BTN_STYLE2 = {
  ...BTN_STYLE,
  y: BTN_STYLE.y + px(100),
  text: 'click me2',
}
