import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Yi Liu | HomePage',
  description: 'Yi Liu | HomePage',

  extendsMarkdown: (md) => {
    // md.use(require('@iktakahiro/markdown-it-katex'))
    // md.use(require('@neilsustc/markdown-it-katex'))
    md.use(require('./plugins/markdown-it-katex'))
    md.use(require('markdown-it-task-lists'))
    md.linkify.set({ fuzzyEmail: false })
  },

  themeConfig: {
    editLink: false,
    lastUpdated: false,
    contributors: false,
    createdTime: false,
    logo: '/logo.png',
    darkMode: false,
    navbar: [
      // NavbarItem
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Papers',
        link: '/papers/',
      },
      // NavbarGroup
      // {
      //   text: 'Group',
      //   children: ['/group/foo.md', '/group/bar.md'],
      // },
      // // 字符串 - 页面文件路径
      // '/bar/README.md',
    ],
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        components: {
          HomePage: path.resolve(__dirname, './components/HomePage.vue'),
        },
      },
    ],
    // [
    //   '@vuepress/plugin-search',
    //   {
    //     locales: {
    //       '/': {
    //         placeholder: 'Search',
    //       },
    //     },
    //   },
    // ],
    
  ],
  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.js' }],
  ]
})