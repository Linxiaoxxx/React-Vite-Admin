// vite.config.ts
import { resolve } from "node:path";
import { defineConfig, loadEnv } from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.28_less@4.2.0/node_modules/vite/dist/node/index.js";
import UnoCSS from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.6/node_modules/unocss/dist/vite.mjs";
import react from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@5.1.6/node_modules/@vitejs/plugin-react/dist/index.mjs";
import AutoImport from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
import Icons from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/vite.js";
import { FileSystemIconLoader } from "file:///E:/Git%20Project/React/React-Vite-Admin/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/loaders.js";
var __vite_injected_original_dirname = "E:\\Git Project\\React\\React-Vite-Admin";
var vite_config_default = defineConfig(({ _, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
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
        imports: ["react", "react-router-dom", { "@/router/uitls": ["defineRouterMeta"] }],
        include: [/\.[tj]sx?$/, /\.md$/],
        dts: "src/types/auto-imports.d.ts",
        eslintrc: {
          enabled: true,
          filepath: "eslintrc-auto-import.json",
          globalsPropValue: true
        }
      }),
      Icons({
        autoInstall: true,
        customCollections: {
          custom: FileSystemIconLoader("src/assets/icons", (svg) => svg.replace(/fill="none"|fill="#[0-9a-fA-F]{3,6}"|fill="[^"]*"/g, 'fill="currentColor"'))
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
      host: "0.0.0.0",
      port: 6006,
      proxy: {
        "/api": {
          target: "http://10.11.25.252",
          // 测试
          rewrite: (path) => path.replace(/^\/api/, ""),
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
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxHaXQgUHJvamVjdFxcXFxSZWFjdFxcXFxSZWFjdC1WaXRlLUFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxHaXQgUHJvamVjdFxcXFxSZWFjdFxcXFxSZWFjdC1WaXRlLUFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9HaXQlMjBQcm9qZWN0L1JlYWN0L1JlYWN0LVZpdGUtQWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB2aXRlUGx1Z2luSW1wIGZyb20gJ3ZpdGUtcGx1Z2luLWltcCdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCB7IEZpbGVTeXN0ZW1JY29uTG9hZGVyIH0gZnJvbSAndW5wbHVnaW4taWNvbnMvbG9hZGVycydcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgXywgbW9kZSB9KSA9PiB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vZGUvcHJlZmVyLWdsb2JhbC9wcm9jZXNzXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogZW52LlZJVEVfQkFTRV9VUkwsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgbGVzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIFVub0NTUygpLFxyXG4gICAgICByZWFjdCgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCB7ICdAL3JvdXRlci91aXRscyc6IFsnZGVmaW5lUm91dGVyTWV0YSddIH1dLFxyXG4gICAgICAgIGluY2x1ZGU6IFsvXFwuW3RqXXN4PyQvLCAvXFwubWQkL10sXHJcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL2F1dG8taW1wb3J0cy5kLnRzJyxcclxuICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGZpbGVwYXRoOiAnZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsXHJcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9KSxcclxuICAgICAgSWNvbnMoe1xyXG4gICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlLFxyXG4gICAgICAgIGN1c3RvbUNvbGxlY3Rpb25zOiB7XHJcbiAgICAgICAgICBjdXN0b206IEZpbGVTeXN0ZW1JY29uTG9hZGVyKCdzcmMvYXNzZXRzL2ljb25zJywgc3ZnID0+IHN2Zy5yZXBsYWNlKC9maWxsPVwibm9uZVwifGZpbGw9XCIjWzAtOWEtZkEtRl17Myw2fVwifGZpbGw9XCJbXlwiXSpcIi9nLCAnZmlsbD1cImN1cnJlbnRDb2xvclwiJykpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgLy8gdml0ZVBsdWdpbkltcCh7XHJcbiAgICAvLyAgIGxpYkxpc3Q6IFtcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICBsaWJOYW1lOiAnYW50ZCcsXHJcbiAgICAvLyAgICAgICBzdHlsZShuYW1lOiBhbnkpIHtcclxuICAgIC8vICAgICAgICAgLy8gdXNlIGxlc3NcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGBhbnRkL2VzLyR7bmFtZX0vc3R5bGUvaW5kZXguanNgXHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICBdXHJcbiAgICAvLyB9KVxyXG4gICAgXSxcclxuXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgIGZzOiB7XHJcbiAgICAgICAgc3RyaWN0OiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogNjAwNixcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMC4xMS4yNS4yNTInLCAvLyBcdTZENEJcdThCRDVcclxuICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgIHdzOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgLy8gYnVpbGQ6IHtcclxuICAvLyAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAvLyAgICAgZXh0ZXJuYWw6IFtcclxuICAvLyAgICAgICAnYW50ZC9lcy90aGVtZS9zdHlsZS9pbmRleC5qcydcclxuICAvLyAgICAgXVxyXG4gIC8vICAgfVxyXG4gIC8vIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxlQUFlO0FBQ25VLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFFbEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsNEJBQTRCO0FBUHJDLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsR0FBRyxLQUFLLE1BQU07QUFFM0MsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFNBQU87QUFBQSxJQUNMLE1BQU0sSUFBSTtBQUFBLElBQ1YsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxRQUNULFNBQVMsQ0FBQyxTQUFTLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLENBQUM7QUFBQSxRQUNqRixTQUFTLENBQUMsY0FBYyxPQUFPO0FBQUEsUUFDL0IsS0FBSztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsVUFBVTtBQUFBLFVBQ1Ysa0JBQWtCO0FBQUEsUUFDcEI7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELE1BQU07QUFBQSxRQUNKLGFBQWE7QUFBQSxRQUNiLG1CQUFtQjtBQUFBLFVBQ2pCLFFBQVEscUJBQXFCLG9CQUFvQixTQUFPLElBQUksUUFBUSxzREFBc0QscUJBQXFCLENBQUM7QUFBQSxRQUNsSjtBQUFBLE1BQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVlIO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixJQUFJO0FBQUEsUUFDRixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBO0FBQUEsVUFDUixTQUFTLFVBQVEsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFVBQzFDLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxVQUNSLElBQUk7QUFBQSxRQUNOO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUUY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
