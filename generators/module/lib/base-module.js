import { ZosGenerator } from '../../../generator.js'
import path from 'path'

export default class BaseGenCmd {
  /**
   * Creates an instance of ModuleGenCmd.
   * @param {ZosGenerator} gen
   */
  constructor(moduleKey, gen) {
    this.gen = gen
    this.moduleKey = moduleKey
  }

  /**
   * resolve module path
   * @param {string} moduleKey
   * @param {string} modulePath
   * @returns
   */
  resolveModulePath(moduleKey, modulePath) {
    throw new Error('not implemented')
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
    throw new Error('not implemented')
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
    throw new Error('not implemented')
  }

  remove() {
    if (!this.gen.options.modulePath) {
      return
    }

    const appPkg = this.gen.fs.readJSON(
      this.gen.destinationPath('app.json'),
      {},
    )

    Object.values(appPkg.targets).map((t) => {
      this.doRemoveConfig(
        {
          root: appPkg,
          target: t,
          module: t.module,
          config: t.module[this.moduleKey],
        },
        {
          moduleKey: this.moduleKey,
          modulePath: this.gen.options.modulePath,
        },
      )
    })

    // write json
    // delete dir
    this.gen.fs.writeJSON(this.gen.destinationPath('app.json'), appPkg)
    this.gen.fs.delete(this.gen.destinationPath(this.moduleKey, this.gen.options.modulePath), {
      globOptions: {
        onlyFiles: false,
      },
    })
  }

  add() {
    if (!this.gen.options.modulePath) {
      return
    }

    const appPkg = this.gen.fs.readJSON(
      this.gen.destinationPath('app.json'),
      {},
    )

    Object.values(appPkg.targets).map((t) => {
      this.doAddConfig(
        {
          root: appPkg,
          target: t,
          module: t.module,
          config: t.module[this.moduleKey],
        },
        {
          moduleKey: this.moduleKey,
          modulePath: this.gen.options.modulePath,
        },
      )
    })

    // copy
    // write json
    this.gen._copyTemplate(
      path.join(this.moduleKey, this.gen.options.template),
      {
        pageName: this.gen.options.modulePath,
      },
      this.gen.destinationPath(this.moduleKey, this.gen.options.modulePath),
    )

    this.gen.fs.writeJSON(this.gen.destinationPath('app.json'), appPkg)
  }
}
