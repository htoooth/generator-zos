import BaseGenCmd from './base-module.js'
import path from 'path'

export default class PageGenCmd extends BaseGenCmd {
  /**
   * Creates an instance of PageGenCmd.
   * @param {ZosGenerator} gen
   * @memberof PageGenCmd
   */
  constructor(gen) {
    super('page', gen)
  }

  /**
   * resolve module path
   * @param {string} moduleKey
   * @param {string} modulePath
   * @returns
   */
  resolveModulePath(moduleKey, modulePath) {
    return path.join(moduleKey, modulePath, 'index.page')
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
    const index = config.pages.indexOf(resolvedModulePath)

    if (index >= 0) {
      this.gen.log(
        chalk.red(`ERROR: dup ${moduleKey} module path ${resolvedModulePath} in target ${targetName}`),
      )
      return
    }

    config.pages.unshift(resolvedModulePath)
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
    const index = config.pages.indexOf(resolvedModulePath)

    if (index < 0) {
      this.gen.log(
        chalk.red(
          `ERROR: not found ${moduleKey} module path ${resolvedModulePath} in target ${targetName}`,
        ),
      )
      return
    }

    config.pages.splice(index, 1)
  }
}
