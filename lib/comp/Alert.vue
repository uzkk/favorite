<template>
  <FavModal :name="content + '-alert'"
             height="auto"
             width="30%"
             :adaptive="true"
             :pivot-y="0.25"
             :classes="['v--modal','vue-dialog']"
             :clickToClose="false"
             :scrollable="true"
  >
    <div class="hint">
      {{ info }}
    </div>
    <span class="checkbox">
      <span class="inner"></span>
      <input type="checkbox" v-model="model">
    </span>
    <span class="label" v-if="$slots.default || label">
      <slot/>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </FavModal>
</template>

<script>
export default {
  name: 'Alert',
  model: {
    event: 'update'
  },
  data () {
    return {}
  },
  async mounted () {
    const VModal = await import('vue-js-modal')
    Vue.use(VModal, { componentName: 'FavModal' })
  },
  methods: {},
  props: ['content', 'info', 'label']
}
</script>