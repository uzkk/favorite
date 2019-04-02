const { resolve } = require('path')
const { readFileSync } = require('fs')
const { safeLoad } = require('js-yaml')

module.exports = (options, context) => ({
  name: '@uzkk/favorite',

  plugins: [
    ['@uzkk/assets'],
    ['@vuepress/register-components', {
      components: [
        { name: 'Favorite', path: resolve(__dirname, 'comp') },
      ],
    }],
  ],

  async ready () {
    context.addPage({
      title: '本命测试',
      path: '/favorite/',
      permalink: '/favorite/',
      frontmatter: {
        layout: 'Favorite',
        footer: false,
        header: {
          banner: false,
        },
      },
    })
  },

  clientDynamicModules () {
    return {
      name: 'characters.js',
      content: 'export default '
        + JSON.stringify(safeLoad(readFileSync(resolve(__dirname, 'data/characters.yaml'), 'utf8'))),
    }
  },
})
