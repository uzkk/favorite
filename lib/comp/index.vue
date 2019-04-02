<template>
  <div class="favorite">
    <header>
      <h1>本命测试</h1>
    </header>
    <FadeSlideTransition>
      <component :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
    </FadeSlideTransition>
    <footer>
      <p>
        这种排序的原理是
        <a
          href="https://en.wikipedia.org/wiki/Pairwise_comparison"
          target="_blank"
        >Pairwise Comparison</a>。根据选择的顺序，结果可能会发生不同。
      </p>
      <p>
        图片采用了画师
        <a
          href="https://www.pixiv.net/member_illust.php?id=4920496"
          target="_blank"
        >dairi</a>
        的作品。全部人物来源于东方 Project，版权属于上海爱丽丝幻乐团。
      </p>
      <p>
        源代码已经开源到
        <a
          href="https://github.com/uzkk/uzkk.net"
          target="_blank"
        >GitHub</a>，遵循
        <a
          href="https://mit-license.org/"
          target="_blank"
        >MIT</a> 协议。脚本的使用，修改，复制等是免费的。
      </p>
    </footer>
  </div>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import { getCharImage, faces } from './utils'
import characters from '@dynamic/characters'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'

export default {
  name: 'Favorite',

  components: {
    Result,
    Select,
    Settings,
    FadeSlideTransition,
  },

  data: () => ({
    phase: 'Settings',
    state: {},
  }),

  mounted () {
    characters.forEach(([id]) => {
      for (const face in faces) {
        const link = document.head.appendChild(document.createElement('link'))
        link.rel = 'prefetch'
        link.href = getCharImage(id, face)
      }
    })
  },

  methods: {
    updatePhase (nextPhase, state) {
      Object.assign(this.state, state)
      this.phase = nextPhase
    },
  },
}

</script>

<style lang="stylus" scoped>

header
  text-align center

  h1
    margin 3rem 0

</style>
