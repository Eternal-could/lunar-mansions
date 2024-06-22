import cac from 'cac';

const cli = cac('lms').version('0.0.1').help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  console.log('dev', root);
})

cli.command('build [root]', 'start build server').action(async (root: string) => {
  console.log('build', root);
})

cli.parse()