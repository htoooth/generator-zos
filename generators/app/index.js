'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: false })
    this.argument('appPath', { type: String, required: false })
    this.option('install', {
      type: Boolean,
      default: false,
      alias: 'i',
      description: 'Install dependencies',
    })
  }

  async prompting() {
    switch (this.options.action) {
      case 'new':
      case 'create': {
        break
      }
      case 'init': {
        break
      }
      default: {
        this.log(
          yosay(
            `Welcome to the laudable ${chalk.red('generator-zos')} generator!`,
          ),
        )
      }
    }
  }

  _genBlankProject() {

  }

  _initBlankProject() {

  }

  writing() {
    switch (this.options.action) {
      case 'new': {
        this._genBlankProject()
        break
      }
      case 'init': {
        this._initBlankProject()
        break
      }
      default: {
      }
    }
  }

  install() {
    if (this.options.install) {
      this.installDependencies({
        npm: true
      });
    }
  }
}
