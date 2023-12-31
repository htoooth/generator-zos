'use strict'
const Generator = require('yeoman-generator')
const path = require('path')
const chalk = require('chalk')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: false })
    this.argument('pagePath', { type: String, required: false })
    this.option('layout', {
      type: Boolean,
      default: false,
      description: 'include layout feature',
      alias: 'l',
    })
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

  _genBlankPage() {
    if (this.options.pagePath) {
      const dirPath = path.dirname(this.options.pagePath)
      const pageName = path.basename(this.options.pagePath)

      const appPkg = this.fs.readJSON(this.destinationPath('app.json'), {})
      const targets = appPkg.targets

      for (let v of Object.values(targets)) {
        const page = `page/${dirPath}/${pageName}.page`
        if (v.module.page.pages.indexOf(page) >= 0) {
          this.log(chalk.red('ERROR: dup page path ' + page))
          return
        }

        v.module.page.pages.unshift(`page/${dirPath}/${pageName}.page`)
      }

      this.fs.copyTpl(
        this.templatePath('blank/index.vender.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.vender.js`),
        ),
        {
          pageName,
          layout: this.options.layout,
        },
      )

      if (this.options.layout) {
        this.fs.copyTpl(
          this.templatePath('blank/index.layout'),
          this.destinationPath(
            path.join('page', dirPath, `${pageName}.layout`),
          ),
          {
            pageName,
            layout: this.options.layout,
          },
        )
      }

      this.fs.copyTpl(
        this.templatePath('blank/index.page.js'),
        this.destinationPath(path.join('page', dirPath, `${pageName}.page.js`)),
        {
          pageName,
          layout: this.options.layout,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.layout.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.layout.js`),
        ),
        {
          pageName,
          layout: this.options.layout,
        },
      )

      this.fs.copyTpl(
        this.templatePath('blank/index.style.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.style.js`),
        ),
        {
          pageName,
          layout: this.options.layout,
        },
      )

      // This.fs.copyTpl(
      //   this.templatePath('blank/index.style.css'),
      //   this.destinationPath(
      //     path.join('page', dirPath, `${pageName}.style.css`),
      //   ),
      //   {
      //     pageName,
      //     layout: this.options.layout,
      //   },
      // )

      this.fs.writeJSON(this.destinationPath('app.json'), appPkg)
    }
  }

  conflicts() {
    this.conflicter.force = true
  }
}
