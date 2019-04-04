const { resolve } = require('path')
const { readFileSync } = require('fs')

module.exports = (options, context) => ({
  name: '@uzkk/favorite',

  plugins: [
    [require('@uzkk/favorite-assets')],
    ['@vuepress/register-components', {
      components: [
        { name: 'Favorite', path: resolve(__dirname, 'comp') },
      ],
    }],
  ],

  additionalPages () {
    return [{
      title: '本命角色测试',
      path: '/favorite/',
      permalink: '/favorite/',
      frontmatter: {
        description: '测试你的本命东方 Project 角色',
        layout: 'Favorite',
        footer: false,
        header: {
          banner: false,
        },
      },
    }, {
      title: '关于本名角色测试',
      path: '/favorite/about.html',
      permalink: '/favorite/about.html',
      frontmatter: {
        description: '关于本名角色测试',
        layout: 'Post',
        aside: false,
      },
      content: readFileSync(resolve(__dirname, 'pages/about.md'), 'utf8'),
    }]
  },

  chainWebpack (config) {
    config.resolve.extensions.merge(['.ts', '.yml', '.yaml'])

    config.module
      .rule('yaml')
        .test(/\.ya?ml$/)
        .use('js-yaml-loader')
        .loader('js-yaml-loader')
        .end()

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
