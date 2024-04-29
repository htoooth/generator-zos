import BaseGenCmd from './base-module.js'
import path from 'path'

export default class AppEventGenCmd extends BaseGenCmd {
  /**
   * Creates an instance of AppEvent.
   * @param {ZosGenerator} gen
   */
  constructor(gen) {
    super('app-side', gen)
  }

  resolveModulePath(moduleKey, modulePath) {
    return path.join(moduleKey, modulePath, 'index')
  }

  /**
   * add config
   *
   * @param {{root: any, target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberofBaseGenCmd
   */
  doAddConfig({ root, target, module, config }, { moduleKey, modulePath }) {
    const resolvedModulePath = this.resolveModulePath(moduleKey, modulePath)
    if (!module[moduleKey]) {
      config = module[moduleKey] = {
        path: resolvedModulePath,
      }

      return
    }

    if (config.path) {
      this.gen.log(
        chalk.red(
          `ERROR: dup ${moduleKey} module path ${resolvedModulePath}`,
        ),
      )
      return
    }

    config.path = resolvedModulePath
  }

  /**
   * remove config
   *
   * @param {{root: any, target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberof AppServiceGenCmd
   */
  doRemoveConfig({ root, target, module, config }, { moduleKey, modulePath }) {
    delete module[moduleKey]
  }
}
