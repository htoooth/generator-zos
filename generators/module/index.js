import _ from 'lodash'
import { ZosGenerator } from '../../generator.js'
import chalk from 'chalk'
import fs from 'fs'

export default class extends ZosGenerator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('moduleType', {
      type: String,
      description: 'module type',
      required: true,
    })
    this.argument('action', { type: String, required: true })
    this.argument('modulePath', { type: String, required: true })
    this.option('template', {
      type: String,
      description: 'module template type',
    })
  }

  default() {}

  async prompting() {
    if (this.options.action === 'add') {
      if (this.options.template) {
        return
      }
      const answers = await this.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Your module template',
          choices: async () => {
            return fs.readdirSync(this.templatePath(this.options.moduleType))
          },
        },
      ])

      Object.assign(this.options, answers)
    }

    try {
      const ModuleCtor = (
        await import('./lib/' + this.options.moduleType + '.js')
      ).default
      this.module = new ModuleCtor(this)
    } catch (error) {
      console.error(error)
    }
  }

  async writing() {
    try {
      switch (this.options.action) {
        case 'add': {
          await this.module.add()
          break
        }

        case 'remove': {
          await this.module.remove()
          break
        }

        default: {
          this.log(chalk.red('not support action', this.options.action))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  conflict() {}
}
