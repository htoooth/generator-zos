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
    if (this.options.pagePath) {
      const dirPath = path.dirname(this.options.pagePath)
      const pageName = path.basename(this.options.pagePath)

      this.fs.copy(
        this.templatePath('blank/index.layout'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.layout` )),
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.page.js'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.page.js` )),
        {
          pageName,
        }
      );

      this.fs.copyTpl(
        this.templatePath('blank/index.layout.js'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.layout.js` )),
        {
          pageName,
        }
      );

      this.fs.copyTpl(
        this.templatePath('blank/index.style.js'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.style.js` )),
        {
          pageName,
        }
      );

      const appPkg = this.fs.readJSON(this.destinationPath('app.json'), {})
      const targets = appPkg.targets

      Object.values(targets).forEach((v) => {
        v.module.page.pages.push(`page/${dirPath}/${pageName}.page`)
      })

      this.fs.writeJSON(this.destinationPath('app.json'), appPkg)
    }
  }
}
