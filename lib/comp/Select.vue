<template>
  <div>
    <h3 class="tac">
      第 {{ questionCount }} 轮：请<span class="emphasize">点击图片</span>选择更喜欢的角色
    </h3>
    <h4 class="tac" v-if="currentRank > 0">
      排名第 {{ currentRank }} 的角色已经确定
    </h4>
    <table class="tac">
      <tr class="characters">
        <td><Character :face="face" :node="currentPair[0]" @click="selectChar(0)"/></td>
        <td><Character :face="face" :node="currentPair[1]" @click="selectChar(1)"/></td>
      </tr>
      <tr>
        <td>
          <Button
            title="将左边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0)"
          >
            不再出现左边的角色
          </Button>
        </td>
        <td>
          <Button
            title="将右边的角色从剩余问题的角色列表中剔除"
            @click="exclude(1)"
          >
            不再出现右边的角色
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            title="将两边的角色从剩余问题的角色列表中剔除"
            @click="exclude(0, 1)"
          >
            不再出现这两个角色
          </Button>
        </td>
        <td>
          <Button
            @click="previous"
            title="重新作答上一题"
            :disabled="questionCount === 1 || this.isPrevious"
          >
            等下，选错了……
          </Button>
        </td>
      </tr>
      <tr>
        <td>
          <Button
            title="本题随机作答"
            @click="randomPick"
          >
            随便替我选个叭
          </Button>
        </td>
        <td>
          <Button
            title="本题及接下来的所有题随机作答"
            @click="randomPickForAll"
          >
            累了，之后都随便选叭
          </Button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <Button
            title="返回主界面"
            type="warning"
            @click="$emit('next', 'Settings')"
          >
            返回主界面
          </Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import Button from '@theme-uzkk/components/Button'
import { getCharactersInRange } from '../utils'
import SortNode from '../utils/SortNode'
import sort from '../utils/sort.mixin'
import Character from './Character'
import { charMap } from '../data'

export default {
  components: { Character, Button },

  mixins: [sort],

  props: ['range', 'ranknum', 'face'],

  created () {
    this.root = new SortNode(0)
    getCharactersInRange(this.range).forEach((name) => {
      this.root.add(charMap[name].clone())
    })
    this.init()
  },

  methods: {
    moveOn (back) {
      if (this.getNextPair(back)) return
      const { questionCount } = this

      // move to next part
      const ranking = []
      let node = this.root
      for (let i = 0; i < this.ranknum; i++) {
        node = node.children[0]
        if (!node) break
        ranking.push(node.name)
      }
      this.$emit('next', 'Result', { ranking, questionCount })
    },
  },
}

</script>

<style lang="stylus" scoped>

table
  margin-left auto
  margin-right auto
  margin-bottom 2em
  border-spacing 0.4em
  border-collapse separate
  vertical-align middle

  @media (max-width 479px)
    table-layout fixed
    width 100%

  @media (max-width 399px)
    font-size 0.8rem

  @media (max-width 479px) and (min-width 400px)
    font-size 0.9rem

td
  padding-left 0.5em
  padding-right 0.5em
  padding-bottom 0.3em

  tr.characters > &
    padding-bottom 0.8em

  button
    display block
    width 100%

</style>
