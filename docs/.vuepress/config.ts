import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { path } = require('@vuepress/utils')

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'zh-CN',
  title: 'Yi Liu',
  description: "Yi Liu (刘逸) is a Ph.D. student at Computer Science Department of The University of Hong Kong (HKU). His research interests include cryptography, privacy, and blockchain. He is mainly working on cryptographic protocols, such as multi-party computation (MPC), zero-knowledge proofs, etc.",

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
      {
        text: 'Home',
        link: '/',
      },
      { 
        text: "Research", 
        link: "/research/" 
      },
      { 
        text: "About Me", 
        link: "/CV/" 
      },
      // {
      //   text: 'Papers',
      //   link: '/papers/',
      // },
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
          ProjectCard: path.resolve(__dirname, './components/ProjectCard.vue'),
          ProfileSection: path.resolve(__dirname, './components/ProfileSection.vue'),
        },
      },
    ],
    [
      '@vuepress/plugin-medium-zoom',
      {
        selector: ':not(a, #logo) > img'
      }
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-V6PJ8BXB1K',
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
    ['link', { rel: 'icon', href: '/logo.ico' }],
    ['script', { src: './jump.js' }],
  ]
})