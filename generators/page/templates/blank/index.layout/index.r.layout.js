import { ui } from '../<%- pageName %>.vender'
import * as defaultView from './default.layout'
import * as style from './index.r.style'

const layout = {
  childLayout: defaultLayout,
  refs: {},
  render(vm) {
    defaultView.layout.render(vm)
  },
}

export { layout, style }
