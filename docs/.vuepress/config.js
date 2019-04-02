module.exports = (context) => ({
  title: '二色幽紫蝶',

  description: '东方 Project - 从入坑到入坟',

  plugins: [
    require('../..'),
  ],

  evergreen: () => !context.isProd,
})
