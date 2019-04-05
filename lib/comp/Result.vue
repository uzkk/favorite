<template>
  <div>
    <h2 class="tac">您的前 {{ ranking.length }} 位本命角色排行：</h2>
    <div
      v-for="[size, start, end] in rankingGroups"
      class="tac row"
      :key="start"
    >
      <ResultChar
        v-for="(char, index) in ranking.slice(start, end)"
        :key="index"
        :rank="index + start + 1"
        :node="char"
        :face="face"
        :size="size"
      />
    </div>
    <collapse-view initial="open" class="result container">
      <h3 slot="header">投票结果</h3>
      <table>
        <tr>
          <th>排名</th>
          <th>姓名</th>
          <th>称号</th>
        </tr>
        <tr v-for="({ name, nick }, index) in ranking" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ name }}</td>
          <td>{{ nick }}</td>
        </tr>
      </table>
    </collapse-view>
    <collapse-view initial="open" class="preference container">
      <h3 slot="header">偏好分数 (开发中)</h3>
      <p v-if="ranking.length < 7 || !preference.length">
        排名数量过少，不予统计。
      </p>
      <table v-else>
        <tr>
          <th>属性名</th>
          <th>参考值</th>
        </tr>
        <tr v-for="({ name, value, index }) in preference" :key="index">
          <td>{{ name }}</td>
          <td>{{ value.toFixed(3) }}</td>
        </tr>
      </table>
    </collapse-view>
    <div class="back-btn-container tac">
      <Button
        class="res-page-back-btn"
        title="返回主界面"
        type="warning"
        @click="backToSettings"
      >
        返回主界面
      </Button>
    </div>
  </div>
</template>

<script>

import Button from './Button'
import ResultChar from './ResultChar'
import CollapseView from './CollapseView'
import { tags, characters } from '../data'
import { getPreference, group } from '../utils'

export default {
  name: 'Result',

  components: {
    CollapseView,
    ResultChar,
    Button,
  },

  props: ['ranking', 'face'],

  data: () => ({}),

  computed: {
    rankingGroups () {
      switch (this.ranking.length) {
        case 1: return [['lg', 0, 1]]
        case 2: return [['lg', 0, 2]]
        case 3: return [['lg', 0, 1], ['md', 1, 3]]
        case 4: return [['lg', 0, 1], ['md', 1, 4]]
        case 5: return [['lg', 0, 2], ['md', 2, 5]]
        case 6: return [['lg', 0, 1], ['lg', 1, 3], ['md', 3, 6]]
        case 7: return [['lg', 0, 2], ['lg', 2, 4], ['md', 4, 7]]
        default: return [
          ['lg', 0, 2],
          ['md', 2, 5],
          ...group(this.ranking.length - 5, 5, 5),
        ]
      }
    },

    preference () {
      return getPreference(this.ranking, tags)
    },
  },

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.row
  margin 1rem 0

.back-btn-container
  width 30%
  margin 1.7em auto

.res-page-back-btn
  width 100%
  display block

.container
  margin 1em auto
  padding 2em
  border-radius .5em
  background-color #fff
  max-width 1080px

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

  h3
    margin 0

  table
    max-width 100%
    border-collapse collapse
    margin 1.5rem auto 0
    text-align center

  tr
    border-top 1px solid #dfe2e5
    &:nth-child(2n)
      background-color #f6f8fa

  th, td
    border 1px solid #dfe2e5
    padding .6em 1em

</style>
