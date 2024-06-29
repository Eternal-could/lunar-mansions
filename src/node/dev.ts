import { createServer } from 'vite';
import {pluginIndexHtml} from './plugin-lms/indexHtml';
import react from '@vitejs/plugin-react'

export function createDevServer(root: string) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), react()]
  })
}
