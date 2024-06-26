import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_URL,
    // base: '',
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      UnoCSS(),
      react(),
      AutoImport({
        imports: ['react', 'react-router-dom', { '@/router/uitls': ['defineRouterMeta'] }],
        include: [/\.[tj]sx?$/, /\.md$/],
        dts: 'src/types/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: 'eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader('src/assets/icons', svg => svg.replace(/fill="none"|fill="#[0-9a-fA-F]{3,6}"|fill="[^"]*"/g, 'fill="currentColor"'))
        }
      })
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style(name: any) {
    //         // use less
    //         return `antd/es/${name}/style/index.js`
    //       }
    //     }
    //   ]
    // })
    ],

    server: {
      open: false,
      fs: {
        strict: true
      },
      host: '0.0.0.0',
      port: 6006,
      proxy: {
        '/api': {
          target: 'http://10.11.25.252', // 测试
          rewrite: path => path.replace(/^\/api/, ''),
          changeOrigin: true,
          secure: false,
          ws: true
        }
      }
    }
  // build: {
  //   rollupOptions: {
  //     external: [
  //       'antd/es/theme/style/index.js'
  //     ]
  //   }
  // }
  }
})
