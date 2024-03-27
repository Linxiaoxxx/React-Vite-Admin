import unocss from '@unocss/eslint-plugin'
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'dist',
      'node_modules',
      'public',
      'nginx_configs',
      '*.md'
    ],
    stylistic: {
      indent: 2,
      quotes: 'single'
    },
    typescript: true,
    vue: true
  },
  {
    rules: {
      // 允许单行if不换行
      // if (condition) doSomething();
      'antfu/if-newline': 'off',
      'no-template-curly-in-string': 'off',
      'no-irregular-whitespace': 'off',
      'ts/prefer-literal-enum-member': 'warn',
      // 删除未尾逗号
      'style/comma-dangle': ['error', 'never'],
      'jsonc/comma-dangle': ['error', 'never'],
      // 仅单行if允许不使用大括号
      'curly': ['error', 'multi-line'],

      // 允许使用 console.warn 和 console.error，但使用 console.log 警告
      'no-console': ['warn', { allow: ['warn', 'error', 'table', 'group', 'log'] }],
      'vue/html-self-closing': 'off'
    }
  },
  unocss.configs.flat
)
