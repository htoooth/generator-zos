import Generator from 'yeoman-generator'

declare class ZosGenerator extends Generator {
  _copyTemplate(templateName: string, data: any, to = ''): void
}

export {
  ZosGenerator
}
