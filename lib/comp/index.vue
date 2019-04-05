<template>
  <div class="favorite">
    <header>
      <h1>本命角色测试</h1>
    </header>
    <FadeSlideTransition>
      <component :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
    </FadeSlideTransition>
    <footer>
      <p>
        <router-link to="/favorite/about.html">关于本命角色测试</router-link>
      </p>
    </footer>
  </div>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import { getCharImage } from '../utils'
import { characters, faces } from '../data'
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
