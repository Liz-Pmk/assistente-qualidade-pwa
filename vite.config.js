import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'icons/icon-192x192.svg',
        'icons/icon-512x512.svg'
      ],
      manifest: {
        name: 'Assistente de Qualidade Omnichannel',
        short_name: 'Assistente Qualidade',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f172a',
        description:
          'PWA para apoiar equipes de qualidade na execução de checklists regulatórios em indústrias de alimentos e fármacos.',
        icons: [
          {
            src: '/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ]
})
