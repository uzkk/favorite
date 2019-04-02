<template>
  <div
    :class="['char-view', { loading }]"
    @click.stop="$emit('click')"
  >
    <img
      ref="img"
      :src="src"
      :alt="node.name"
      v-show="!loading"
      @load="check($event.target)"
    />
    <div class="mask" v-show="loading">
      <i class="icon-spinner"/>
    </div>
    <div class="info">
      <div class="name">{{ node.name }}</div>
      <div class="nick">{{ node.nick }}</div>
    </div>
  </div>
</template>

<script>

import '../styles/icons.css'
import { getCharImage } from './utils'

export default {
  props: ['node', 'face'],

  data: () => ({
    loading: true,
  }),

  watch: {
    src (value) {
      this.check(this.$refs.img)
    },
  },

  computed: {
    src () {
      return getCharImage(this.node.id, this.face)
    },
  },

  methods: {
    check (img) {
      this.loading = !img.src.endsWith(this.src)
    },
  },
}

</script>

<style lang="stylus" scoped>

$bgColor = #0008

@keyframes rotating
  0%
    transform rotateZ(0)
  100%
    transform:rotateZ(360deg)

.char-view
  width 200px
  max-width 100%
  user-select none
  position relative
  border 1px solid black
  cursor pointer
  box-shadow 0 0 2px 1px $bgColor

  img
    width 100%
    display block

  .mask
    width 100%
    padding-top 150%
    background #fff

  i.icon-spinner
    color $accentColor
    font-size 3em
    top 50%
    left 0
    width 100%
    position absolute
    margin-top -1em
    animation rotating 1s linear infinite

  .info
    opacity 0
    position absolute
    width 100%
    transition 0.3s ease
    background $bgColor
    color #fffc
    bottom 0
    line-height 1.6
    padding 0.2em 0

    .name
      font-size 1.2em

  &:hover, &.loading
    .info
      opacity 1

</style>
