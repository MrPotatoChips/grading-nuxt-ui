import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import ViteVue from '@vitejs/plugin-vue'
import ViteVueJsx from '@vitejs/plugin-vue-jsx'
import ViteVueDevTools from 'vite-plugin-vue-devtools'
import ViteTailwindCSS from '@tailwindcss/vite'
import ViteNuxtUI from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    ViteVue(),
    ViteVueJsx(),
    ViteVueDevTools(),
    ViteTailwindCSS(),
    ViteNuxtUI({
      ui: {
        colors: {
          primary: 'sky',
          secondary: 'emerald',
          neutral: 'neutral'
        },
        table: {
          slots: {
            thead: 'bg-primary-200',
            th: 'py-1.5'
          }
        },
        button: {
          slots: {
            base: 'cursor-pointer'
          }
        },
        selectMenu: {
          slots: {
            base: 'cursor-text'
          }
        },
        switch: {
          slots: {
            base: 'cursor-pointer'
          }
        },
        tabs: {
          slots: {
            trigger: 'cursor-pointer'
          }
        },
        input: {
          slots: {
            base: [
              'disabled:bg-neutral-100 dark:disabled:bg-neutral-800'
            ]
          }
        }
      }
    }),
    VitePWA({
      manifest: {
        name: 'Customer Relationship Management System',
        short_name: 'CRMS',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          }
          // {
          //   src: 'android-chrome-512x512.png', // <== don't add slash, for testing
          //   sizes: '512x512',
          //   type: 'image/png',
          //   purpose: ['any', 'maskable'], // testing new type declaration
          // },
        ],
      },
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        sourcemap: true,
        // globFollow: true,
        // globPatterns: ["**\/*.{js,wasm,css,html,json,ts,vue}"],
        // globIgnores: [
        //   '**/*.{png,jpg,jpeg,gif,svg,webp}', // Existing ignores
        //   '**/virtual:/**', // Catch-all for virtual modules
        //   // You can use the specific pattern for better accuracy:
        //   '**/@id/virtual:nuxt-ui-templates/ui/*.ts',
        // ],
        // ignoreURLParametersMatching: [/^utm_/, /^fbclid$/, /^api$/]
        // navigationPreload: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8081
  },
  build: {
    // sourcemap: true, // turn on for staging debugging, turn off for production
    rollupOptions: {
      output: {
        // Entry chunk files (your main JS files)
        entryFileNames: 'assets/js/[hash].js',

        // Secondary chunk files (lazy loaded modules)
        chunkFileNames: 'assets/js/[hash].js',

        // Asset files (CSS, images, fonts, etc.)
        assetFileNames: file => {

          // // Get the file extension
          // const info = file.names
          // const extType = info[info.length - 1]

          // Images and SVGs
          if (/\.(png|jpe?g|gif|svg|webp|ico|tiff|bmp)$/i.test(file.names)) {
            return `assets/img/[hash][extname]`
          }

          // CSS files
          if (/\.css$/i.test(file.names)) {
            return `assets/css/[hash][extname]`
          }

          // Fonts
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(file.names)) {
            return `assets/fonts/[hash][extname]`
          }

          // Default for any other assets
          return `assets/[hash][extname]`
        }
      }
    }
  }
})
