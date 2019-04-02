<template>
  <button
    :title="disabled ? '' : title"
    :class="type"
    :disabled="disabled"
    @click.stop="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'default',
    },
    title: String,
    disabled: Boolean,
  },
}

</script>

<style lang="stylus" scoped>

active-bg-color(color)
  background-color color

  &:hover
    background-color lighten(color, 30%)

  &:active
    background-color darken(color, 30%)

button
  font-size 1em
  line-height 1.2em
  appearance none
  user-select none
  border none
  border-radius 0.4em
  color #fff
  cursor pointer
  padding 0.6em 0.4em
  transition 0.3s ease

  &:focus
    outline 0

  &:disabled
    cursor default
    background-color #999 !important

  &.default
    active-bg-color($accentColor)

  &.warning
    active-bg-color(#f33)

</style>
