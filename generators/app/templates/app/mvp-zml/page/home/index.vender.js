import { getDeviceInfo } from '@zos/device'
import ui from '@zos/ui'
import { getPackageInfo } from '@zos/app'
import { push as _push } from '@zos/router'

export { px, log, log as Logger } from '@zos/utils'
export { getText } from '@zos/i18n'
export { showToast } from '@zos/interaction'
export { align, text_style } from '@zos/ui'
export { ui }
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

export function push(obj) {
  if ('index' in obj) {
    obj.url = getPackageInfo().pages[obj.index]
    _push(obj)
  }

  return
}
