import Generator from 'yeoman-generator'

export class ZosGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  _copyTemplate(templateName, data, to = '') {
    this.fs.copyTpl(
      this.templatePath(templateName),
      this.destinationPath(to),
      {
        ...data,
      },
      undefined,
      {
        globOptions: {
          dot: true,
        },
      },
    )
  }
}
