import cac from 'cac';
import {createDevServer} from './dev';

const version = require('../../package.json').version

const cli = cac('lms').version(version).help()

cli.command('dev [root]', 'start dev server').action(async (root: string) => {
  const server = await createDevServer(root)
  await server.listen()
  server.printUrls()
})

cli.command('build [root]', 'start build server').action(async (root: string) => {
  console.log('build', root);
})

cli.parse()
