<template>
  <FadeSlideTransition>
    <component :is="phase" :key="phase"/>
  </FadeSlideTransition>
</template>

<script>

import Result from './Result'
import Select from './Select'
import Settings from './Settings'
import { characters, faces } from '../data'
import { getCharImage, capitalize } from '../utils'
import FadeSlideTransition from '@theme-uzkk/transitions/FadeSlide'

export default {
  components: {
    Result,
    Select,
    Settings,
    FadeSlideTransition,
  },

  computed: {
    phase () {
      const { query } = this.$route

      // explicit phase
      if (query.phase) {
        const phase = capitalize(query.phase)
        if (['Select', 'Settings'].includes(phase)) {
          return phase
        }
      }

      // default behavior
      if (query.ranking) {
        return 'Result'
      } else if (query.range && query.face && query.max) {
        return 'Select'
      } else {
        return 'Settings'
      }
    },
  },

  mounted () {
    characters.forEach(([id]) => {
      for (const face in faces) {
        const link = document.head.appendChild(document.createElement('link'))
        link.rel = 'prefetch'
        link.href = getCharImage(id, face)
      }
    })
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"></style>
