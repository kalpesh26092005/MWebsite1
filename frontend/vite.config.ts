import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const configDir = dirname(fileURLToPath(import.meta.url))

// Exposes ../shared/products.json to the app as "virtual:site-data"
// (the shared file lives outside the Vite root and must work in builds too).
function siteDataPlugin(): Plugin {
  const VIRTUAL_ID = 'virtual:site-data'
  const RESOLVED_ID = '\0' + VIRTUAL_ID
  return {
    name: 'site-data',
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_ID : null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      const json = readFileSync(resolve(configDir, '../shared/products.json'), 'utf8')
      return `export default ${json}`
    }
  }
}

export default defineConfig({
  plugins: [react(), siteDataPlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
