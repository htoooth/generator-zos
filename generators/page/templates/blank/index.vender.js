import { getDeviceInfo } from '@zos/device'
export { px, log, log as Logger } from '@zos/utils'
export { getText } from '@zos/i18n'
import ui from '@zos/ui'
import { getPackageInfo } from '@zos/app'
import { push as _push } from '@zos/router'
export { showToast } from '@zos/interaction'

export { ui }
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()

export function push(obj) {
  if (obj.index) {
    obj.url = getPackageInfo().pages[obj.index]
    _push(obj)
  }

  return
}
