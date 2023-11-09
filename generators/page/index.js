'use strict'
const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: true })
    this.argument('pagePath', { type: String, required: true })
  }

  writing() {
    switch (this.options.action) {
      case 'add':
      case 'new': {
        this._genBlankPage()
        break
      }

      case 'delete':
      case 'remove': {
        this._removePage()
        break
      }

      default: {
        this.log('not support action', this.options.action)
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

  _genBlankPage() {
    if (this.options.pagePath) {
      const dirPath = path.dirname(this.options.pagePath)
      const pageName = path.basename(this.options.pagePath)

      this.fs.copyTpl(
        this.templatePath('blank/index.vender.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.vender.js`),
        ),
        {
          pageName,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.layout'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.layout`)),
        {
          pageName,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.page.js'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.page.js`)),
        {
          pageName,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.layout.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.layout.js`),
        ),
        {
          pageName,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.style.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.style.js`),
        ),
        {
          pageName,
        },
      )

      const appPkg = this.fs.readJSON(this.destinationPath('app.json'), {})
      const targets = appPkg.targets

      Object.values(targets).forEach((v) => {
        // V.module.page.pages.push(`page/${dirPath}/${pageName}.page`)
        v.module.page.pages.unshift(`page/${dirPath}/${pageName}.page`)
      })

      this.fs.writeJSON(this.destinationPath('app.json'), appPkg)
    }
  }
}
