<template>
  <div>
    <h2 class="tac">您的前 {{ ranking.length }} 位本命角色排行</h2>

    <div class="ranking">
      <div
        v-for="[size, start, end] in rankingGroups"
        class="tac row"
        :key="start"
      >
        <ResultChar
          v-for="(name, index) in ranking.slice(start, end)"
          :key="index"
          :rank="index + start + 1"
          :node="charMap[name]"
          :face="face"
          :class="size"
        />
      </div>
    </div>

    <collapse-view initial="open" class="section">
      <h3 slot="header">测试结果</h3>
      <p>
        本次测试中，您通过 {{ questionCount }}
        轮回答，从共计 {{ characters.length }}
        名角色中选出了前 {{ ranking.length }} 名。
      </p>
      <table class="result">
        <tr>
          <th class="index">排名</th>
          <th class="name">姓名</th>
          <th class="nick">称号</th>
        </tr>
        <tr v-for="(name, index) in ranking" :key="index">
          <td class="index">{{ index + 1 }}</td>
          <td class="name">{{ name }}</td>
          <td class="nick">{{ charMap[name].nick }}</td>
        </tr>
      </table>
    </collapse-view>

    <collapse-view initial="open" class="section">
      <h3 slot="header">偏好分数</h3>
      <p v-if="ranking.length < 7">
        排名数量过少，不予统计。
      </p>
      <p v-else-if="!preference.length">
        未找到您可能的偏好标签。
      </p>
      <template v-else>
        <div v-if="highPref.length > 0" class="tac">
          <p>幻想乡众贤者开会后一致认为，您极有可能属于下列人群：</p>
          <p>
            <span v-for="({ name, index }) in highPref" :key="index" class="high-pref">
              {{ name }}控
            </span>
          </p>
          <p>考虑到此类人群对幻想乡生物的危险性，贤者们已决定在您幻想入后将您调教成罪袋。请做好相应的觉悟。</p>
        </div>
        <table>
          <tr>
            <th>属性名</th>
            <th>参考值</th>
          </tr>
          <tr v-for="({ name, value, index }) in preference" :key="index">
            <td>{{ name }}</td>
            <td>{{ value.toFixed(3) }}</td>
          </tr>
        </table>
      </template>
    </collapse-view>

    <div class="button-container">
      <Button
        title="返回主界面"
        type="warning"
        @click="$emit('next', 'Settings')"
      >
        返回主界面
      </Button>
      <Button
        title="关于本命测试"
        @click="$router.push(UZKK_FAVORITE_BASE + 'about.html')"
      >
        关于本命测试
      </Button>
    </div>
  </div>
</template>

<script>

import Button from '@theme-uzkk/components/Button'
import CollapseView from '@theme-uzkk/components/CollapseView'
import ResultChar from './ResultChar'
import { charMap } from '../data'
import { getPreference, groupByWidth, getCharactersInRange } from '../utils'

export default {
  components: {
    CollapseView,
    ResultChar,
    Button,
  },

  props: ['characters', 'ranking', 'face', 'range', 'questionCount'],

  data: () => ({
    width: innerWidth,
  }),

  created () {
    this.charMap = charMap
    this.preference = getPreference(this.ranking, this.range)
    this.highPref = this.preference.filter(tag => tag.value >= 0.2)
  },

  mounted () {
    this.onResize = () => this.width = innerWidth
    addEventListener('resize', this.onResize)
  },

  computed: {
    rankingGroups () {
      return groupByWidth(this.ranking.length, this.width)
    },
  },

  beforeDestroy () {
    removeEventListener('resize', this.onResize)
  },
}

</script>

<style lang="stylus" scoped>

.ranking
  margin-bottom 2rem
  .row
    margin 1rem 0

.result
  @media (max-width 568px)
    th.nick, td.nick
      display none

.high-pref
  font-weight bold
  margin auto 0.5em
  font-size 1.2em
  display inline-block

</style>
