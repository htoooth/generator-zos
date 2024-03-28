import path from 'node:path'
import _ from 'lodash'
import fs from 'node:fs'
import { ZosGenerator } from '../../generator.js'
import chalk from 'chalk'

export default class extends ZosGenerator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: false })
    this.argument('pagePath', { type: String, required: false })
    this.option('template', {
      type: String,
      default: 'vanilla',
      description: 'template type',
      alias: 't'
    })
  }

  default() {
  }

  writing() {
    switch (this.options.action) {
      case 'add':
      case 'create':
      case 'new': {
        this._genPage()
        break
      }

      case 'delete':
      case 'remove': {
        this._removePage()
        break
      }

      default: {
        this.log(chalk.red('not support action', this.options.action))
      }
    }
  }

  _removePage() {
    if (this.options.pagePath) {
      const dirPath = path.dirname(this.options.pagePath)
      const pageName = path.basename(this.options.pagePath)

      this.fs.delete(this.destinationPath(`page/${dirPath}/${pageName}.*`), {
        globOptions: {
          onlyFiles: false,
        },
      })

      const appPkg = this.fs.readJSON(this.destinationPath('app.json'), {})
      const targets = appPkg.targets

      Object.values(targets).forEach((v) => {
        const page = `page/${dirPath}/${pageName}.page`
        const index = v.module.page.pages.indexOf(page)

        if (index !== -1) {
          v.module.page.pages.splice(index, 1)
        }
      })

      this.fs.writeJSON(this.destinationPath('app.json'), appPkg)
    }
  }

  _genPage() {
    if (this.options.pagePath) {
      const pageName = path.basename(this.options.pagePath)

      const appPkg = this.fs.readJSON(this.destinationPath('app.json'), {})
      const targets = appPkg.targets

      for (let v of Object.values(targets)) {
        const page = `page/${this.options.pagePath}/index.page`
        if (v.module.page.pages.indexOf(page) >= 0) {
          this.log(chalk.red('ERROR: dup page path ' + page))
          return
        }

        v.module.page.pages.unshift(page)
      }

      this.log('this.options.template', this.options.template)
      this._copyTemplate('page/' + this.options.template, {
        pageName: pageName
      }, this.destinationPath('page',this.options.pagePath))

      this.fs.writeJSON(this.destinationPath('app.json'), appPkg)
    }
  }

  conflict() {

  }
}
