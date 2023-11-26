'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const postcssJs = require('postcss-js')
const postcss = require('postcss')
const path = require('path')
const fs = require('fs')
const { walkObject } = require('./walk')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: false })
    this.argument('pagePath', { type: String, required: false })
  }

  writing() {
    switch (this.options.action) {
      case 'compile': {
        this._compileCss()
        break
      }
    }
  }

  _compileCss() {
    if (this.options.pagePath) {
      const dirPath = path.dirname(this.options.pagePath)
      const pageName = path.basename(this.options.pagePath)

      const cssFile = fs.readFileSync(
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.style.css`),
        ),
        {
          encoding: 'utf-8',
        },
      )

      const cssRoot = postcss.parse(cssFile)
      const cssObj = postcssJs.objectify(cssRoot)

      const payload = walkObject(cssObj)

      this.fs.copyTpl(
        this.templatePath('index.style.css.js'),
        this.destinationPath(
          path.join('page', dirPath, `${pageName}.style.css.js`),
        ),
        {
          pageName,
          payload,
        },
      )
    }
  }

  conflicts() {
    this.conflicter.force = true
  }
}
