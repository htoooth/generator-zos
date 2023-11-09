import { ui } from './exports'
import * as defaultView from './default.layout'
import * as style from './index.b.style'

const layout = {
  childLayout: defaultView,
  refs: {},
  render(vm) {
    defaultView.layout.render(vm)
  },
}

export { layout, style }
