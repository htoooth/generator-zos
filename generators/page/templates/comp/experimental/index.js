import { log } from '@zos/utils'
import { style, layout, method } from './layout'
import { ui } from './vender'

export default class {
  name = 'comp1'

  constructor(ctx) {
    // page context
    this.ctx = ctx

    // your comp ui elements reference
    this.$refs = {}

    // your comp private state
    this.state = {}

    // init your state
  }

  mount() {
    // init you ui
    log.log('your code before render')
  }

  render(opts) {
    // draw you ui
    log.log('comp1', style, layout, method)
    log.log('ui', ui.createWidget)
  }

  destroy() {
    log.log('destroy ui resource')
  }
}
