module.exports = (context) => ({
  base: '/favorite/',

  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  theme: 'uzkk',

  plugins: [
    [require('@uzkk/shared-assets')],
    [require('../..'), {
      base: '/',
    }],
  ],

  themeConfig: {
    lang: {
      home: '东方 Project - 从入坑到入坟',
      posts: 'My Posts',
    },
  },

  evergreen: () => !context.isProd,
})
