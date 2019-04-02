const { resolve } = require('path')
const { readFileSync } = require('fs')
const { safeLoad } = require('js-yaml')

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
    return {
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
    }
  },

  clientDynamicModules () {
    return {
      name: 'characters.js',
      content: 'export default '
        + JSON.stringify(safeLoad(readFileSync(resolve(__dirname, 'data/characters.yaml'), 'utf8'))),
    }
  },
})
