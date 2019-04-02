module.exports = (context) => ({
  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  theme: 'uzkk',

  plugins: [
    require('../..'),
  ],

  themeConfig: {
    lang: {
      home: '东方 Project - 从入坑到入坟',
      posts: 'My Posts',
    },
  },

  ready () {
    const homepage = context.pages.find(p => p.path === '/')
    Object.assign(homepage.frontmatter, {
      layout: 'Favorite',
      footer: false,
      header: {
        banner: false,
      },
    })
  },

  evergreen: () => !context.isProd,
})
