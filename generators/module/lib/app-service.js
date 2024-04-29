import BaseGenCmd from './base-module.js'
import path from 'path'

export default class AppServiceGenCmd extends BaseGenCmd {
  /**
   * Creates an instance of AppService.
   * @param {ZosGenerator} gen
   */
  constructor(gen) {
    super('app-service', gen)
  }

  resolveModulePath(moduleKey, modulePath) {
    return path.join(moduleKey, modulePath, 'index')
  }

  /**
   * add config
   *
   * @param {{root: any, targetName: string ,target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberofBaseGenCmd
   */
  doAddConfig(
    { root, targetName, target, module, config },
    { moduleKey, modulePath },
  ) {
    const resolvedModulePath = this.resolveModulePath(moduleKey, modulePath)

    if (!target[moduleKey]) {
      config = module[moduleKey] = {
        services: [resolvedModulePath],
      }
      return
    }

    if (!config.services) {
      config.services = [resolvedModulePath]
    } else {
      if (config.services.includes(resolvedModulePath)) {
        this.gen.log(
          chalk.red(
            `ERROR: dup ${moduleKey} module path ${resolvedModulePath}`,
          ),
        )
        return
      }

      config.services.push(resolvedModulePath)
    }
  }

  /**
   * remove config
   *
   * @param {{root: any, targetName: string ,target: any, module: any, config: any}} ctx
   * @param {{moduleKey: string, modulePath: string}} options
   * @memberof AppServiceGenCmd
   */
  doRemoveConfig(
    { root, targetName, target, module, config },
    { moduleKey, modulePath },
  ) {
    const resolvedModulePath = this.resolveModulePath(moduleKey, modulePath)
    const index = config.services.indexOf(resolvedModulePath)

    if (index !== -1) {
      config.services.splice(index, 1)
    }
  }
}
