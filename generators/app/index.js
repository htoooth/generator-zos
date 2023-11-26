'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const path = require('path')
const _ = require('lodash')
const extend = require('deep-extend')
const mkdirp = require('mkdirp')

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function parseScopedName(name) {
  const parseResult = {
    scopeName: path.dirname(name),
    localName: path.basename(name),
  }

  return parseResult
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: true })
    this.argument('appPath', {
      type: String,
      description: 'Your project name',
      required: false,
      default: process.cwd(),
    })
    this.option('install', {
      type: Boolean,
      default: false,
      alias: 'i',
      description: 'Install dependencies',
    })

    this.option('type', {
      type: String,
      default: 'app',
      alias: 't',
      description: 'Project type',
    })
  }

  initializing() {
    this.props = Object.assign({}, parseScopedName(this.options.appPath))
  }

  default() {
    if (this.options.action === 'new') {
      mkdirp.sync(this.options.appPath)
      this.destinationRoot(this.destinationPath(this.options.appPath))
    }
  }

  _genBlankProject() {
    const appName = this.props.localName
    const appId = getRandomNumber(20000, 30000)

    switch (this.options.type) {
      case 'app': {
        this.fs.copyTpl(
          this.templatePath('app/blank'),
          this.destinationPath(),
          {
            appName,
            appId,
          },
          undefined,
          {
            globOptions: {
              dot: true,
            },
          },
        )
        break
      }

      case 'wf':
      case 'watchface': {
        this.fs.copyTpl(
          this.templatePath('watchface/blank'),
          this.destinationPath(),
          {
            appName,
            appId,
          },
          undefined,
          {
            globOptions: {
              dot: true,
            },
          },
        )
        break
      }
    }
  }

  writing() {
    switch (this.options.action) {
      case 'new':
      case 'create': {
        this._genBlankProject()
        break
      }

      case 'init': {
        this._genBlankProject()
        break
      }

      default: {
      }
    }
  }

  install() {
    if (this.options.install) {
      this.installDependencies({
        npm: true,
        bower: false,
        yarn: false,
      })
    }
  }
}
