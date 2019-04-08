const { resolve } = require('path')

// workaround vuepress #1525
const App = require('@vuepress/core/lib/node/App')
App.prototype.addPage = async function (options) {
  const Page = require('@vuepress/core/lib/node/Page')
  options.permalinkPattern = this.siteConfig.permalink
  const page = new Page(options, this)
  await page.process({
    markdown: this.markdown,
    computed: new this.ClientComputedMixinConstructor(),
    enhancers: this.pluginAPI.getOption('extendPageData').items,
  })
  const index = this.pages.findIndex(({ path }) => path === page.path)
  if (index >= 0) {
    this.pages.splice(index, 1, page)
  } else {
    this.pages.push(page)
  }
}

module.exports = ({
  base = '/favorite/',
}, context) => ({
  name: '@uzkk/favorite',

  plugins: [
    [require('@uzkk/favorite-assets')],
    ['@vuepress/register-components', {
      components: [
        { name: 'Favorite', path: resolve(__dirname, 'comp') },
      ],
    }],
  ],

  additionalPages: [{
    title: '本命角色测试',
    path: base,
    permalink: base,
    frontmatter: {
      description: '测试你的本命东方 Project 角色',
      layout: 'Favorite',
    },
  }, {
    title: '关于本命角色测试',
    path: base + 'about.html',
    permalink: base + 'about.html',
    frontmatter: {
      description: '关于本命角色测试',
      layout: 'Post',
      aside: false,
    },
    filePath: resolve(__dirname, 'pages/about.md'),
  }],

  enhanceAppFiles: {
    name: 'uzkk-favorite-base.js',
    content: `export default ({ Vue }) => {
  Vue.prototype.UZKK_FAVORITE_BASE = ${JSON.stringify(base)}
}`,
  },

  chainWebpack (config) {
    config.module
      .rule('ts')
        .test(/\.ts$/)
        .exclude
          .add(path => !path.startsWith(__dirname))
          .end()
        .use('ts-loader')
        .loader('ts-loader')
        .options({
          configFile: resolve(__dirname, '../tsconfig.json'),
        })
        .end()
  },
})
