<template>
  <div class="char-view" :class="size">
    <div class="rank">第 {{ rank }} 位</div>
    <img :src="$uzkk.favoriteImage(node.id, face)" :alt="node.name">
    <div class="info">
      <div class="name">{{ node.name }}</div>
      <div class="nick">{{ node.nick }}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['node', 'face', 'size', 'rank'],
}

</script>

<style lang="stylus" scoped>

.char-view
  display inline-block
  position relative
  margin 0 1.5em
  width 10em

  &.lg
    font-size 1.125rem
  &.md
    font-size 1rem
  &.sm
    font-size .75rem

  .rank
    color $textColor
    line-height 1.6
    padding 0.2em 0

  img
    width 100%
    display block
    user-select none
    border 1px solid black
    box-shadow 0 0 2px 1px #0008

  .info
    color $textColor
    line-height 1.6
    padding 0.2em 0
    width max-content
    transform translateX(-50%)
    left 50%
    position relative

    .name
      font-size 1.2em

</style>
