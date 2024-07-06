import { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import {CLIENT_ENTRY_PATH, DEFAULT_TEMPLATE_PATH} from '../constants';

export function pluginIndexHtml():Plugin {
  return {
    name: 'lms:index-html',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${ CLIENT_ENTRY_PATH }`
            },
            injectTo: 'body'
          }
        ]
      }
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next)=>{
          try {
            // 1. 读取 template.html 的文件内容
            let html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
            // 2. 响应 HTML 浏览器
            html = await server.transformIndexHtml(req.url, html, req.originalUrl)
            res.setHeader('Content-Type', 'text/html')
            res.end(html)
          } catch (e) {
            return next(e)
          }
        })
      }
    }
  }
}
