import { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import {DEFAULT_TEMPLATE_PATH} from '../constants';

export function pluginIndexHtml():Plugin {
  return {
    name: 'lms:index-html',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next)=>{
          try {
            // 1. 读取 template.html 的文件内容
            let html = await readFile(DEFAULT_TEMPLATE_PATH, 'utf-8')
            // 2. 响应 HTML 浏览器
            // res.setHeader('Content-Type', 'text/html')
            html = await server.transformIndexHtml(req.url, html)
            res.end(html)
          } catch (e) {
            return next(e)
          }
        })
      }
    }
  }
}
