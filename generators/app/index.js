import path from 'node:path'
import fs from 'node:fs'
import _ from 'lodash'
import { ZosGenerator } from '../../generator.js'

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

export default class extends ZosGenerator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('action', { type: String, required: true })
    this.argument('appPath', {
      type: String,
      description: 'Your project path',
      required: false,
      default: process.cwd(),
    })

    this.option('type', {
      type: String,
      default: 'app',
      description: 'Project type',
    })

    this.option('template', {
      type: String,
      default: 'vanilla',
      description: 'template type',
      alias: 't'
    })

    this.option('api', {
      type: String,
      default: 'v3.0',
      description: 'api level',
    })
  }

  initializing() {
    this.props = { ...parseScopedName(this.options.appPath) }
  }

  default() {
    if (this.options.action === 'new' || this.options.action === 'create') {
      fs.mkdirSync(this.options.appPath, { recursive: true })
      this.destinationRoot(this.destinationPath(this.options.appPath))
    }
  }

  _genProject() {
    const appName = this.props.localName
    const appId = getRandomNumber(20000, 30000)
    const apiLevel = this.options.api

    switch (this.options.type) {
      case 'app': {
        const appTemp = `app/${this.options.template}`
        this._copyTemplate(appTemp, {
          appName,
          appId,
          apiLevel: apiLevel.substring(1),
        })
        break
      }

      default: {
        this.log('no action')
      }
    }
  }

  writing() {
    switch (this.options.action) {
      case 'new':
      case 'create': {
        this._genProject()
        break
      }

      case 'init': {
        this._genProject()
        break
      }

      default: {
        this.log('no action')
      }
    }
  }

  install() {}

  end() {
    const cwd = process.cwd()
    const root = path.join(cwd, this.options.appPath)

    const cdProjectName = path.relative(cwd, root)
    console.log(`\nDone. Now run:\n`)
    if (root !== cwd) {
      console.log(
        `  cd ${
          cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
        }`,
      )
    }

    const pkgManager = 'npm'
    console.log(`  ${pkgManager} install`)
    console.log(`  zeus dev`)
    console.log()
  }
}
