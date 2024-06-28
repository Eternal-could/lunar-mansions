import { createServer } from 'vite';
import {pluginIndexHtml} from './plugin-lms/indexHtml';

export function createDevServer(root: string) {
  return createServer({
    root,
    plugins: [pluginIndexHtml()]
  })
}
