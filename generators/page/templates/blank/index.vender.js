import { getDeviceInfo } from '@zos/device'
export { px, log, log as Logger } from '@zos/utils'
export { getText } from '@zos/i18n'
import ui from '@zos/ui'
export { showToast } from '@zos/interaction'

export { ui }
export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = getDeviceInfo()
