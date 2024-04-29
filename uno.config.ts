import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  presets: [
    presetRemToPx({
      baseFontSize: 4 // 1：1使用
    }),
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        // 使用本地svg作为字体图标 使用方式 class="i-custom-[name]"
        // 但是无法用动态名称加载
        custom: FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/fill="none"|fill="#[0-9a-fA-F]{3,6}"|fill="[^"]*"/g, 'fill="currentColor"'))
      }
    })
  ],
  shortcuts: [
    { 'wh-full': 'w-full h-full' },
    { 'wh-screen': 'w-screen h-screen' },
    { 'flex-center': 'flex justify-center items-center' },
    { 'flex-col-center': 'flex flex-col justify-center items-center' }
  ],
  rules: []
})
