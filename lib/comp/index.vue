<template>
  <div class="favorite">
    <FadeSlideTransition>
      <component :is="phase" :key="phase" @next="updatePhase" v-bind="state"/>
    </FadeSlideTransition>
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
