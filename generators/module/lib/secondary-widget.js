import BaseGenCmd from './base-module.js'
import path from 'path'

export default class SecondaryWidgetGenCmd extends BaseGenCmd {
  /**
   * Creates an instance of PageGenCmd.
   * @param {ZosGenerator} gen
   * @memberof PageGenCmd
   */
  constructor(gen) {
    super('secondary-widget', gen)
  }

  /**
   * resolve module path
   * @param {string} moduleKey
   * @param {string} modulePath
   * @returns
   */
  resolveModulePath(moduleKey, modulePath) {
    return path.join(moduleKey, modulePath, 'index')
  }

  /**
   * add config
   *
   * @param {{root: any, targetName: string, target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberofBaseGenCmd
   */
  doAddConfig(
    { root, targetName, target, module, config },
    { moduleKey, modulePath },
  ) {
    const resolvedModulePath = this.resolveModulePath(moduleKey, modulePath)

    if (!config) {
      config = module[moduleKey] = {
        widgets: [
          {
            path: resolvedModulePath,
            icon: 'icon.png',
            name: 'secondary-widget',
          },
        ],
      }

      return
    }
    const index = config.widgets.findIndex((w) => w.path === resolvedModulePath)

    if (index >= 0) {
      this.gen.log(
        chalk.red(
          `ERROR: dup ${moduleKey} module path ${resolvedModulePath} in target ${targetName}`,
        ),
      )
      return
    }

    config.widgets.push({
      path: resolvedModulePath,
      icon: 'icon.png',
      name: 'secondary-widget',
    })
  }

  /**
   * remove config
   *
   * @param {{root: any, targetName: string, target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberof AppServiceGenCmd
   */
  doRemoveConfig(
    { root, targetName, target, module, config },
    { moduleKey, modulePath },
  ) {
    const resolvedModulePath = this.resolveModulePath(moduleKey, modulePath)
    const index = config.widgets.findIndex((w) => w.path === resolvedModulePath)

    if (index < 0) {
      this.gen.log(
        chalk.red(
          `ERROR: not found ${moduleKey} module path ${resolvedModulePath} in target ${targetName}`,
        ),
      )
      return
    }

    config.widgets.splice(index, 1)
  }
}
