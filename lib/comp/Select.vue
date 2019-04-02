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
        <td><Character :face="face" :node="pair[0]" @click="selectChar(0)"/></td>
        <td><Character :face="face" :node="pair[1]" @click="selectChar(1)"/></td>
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
        <td colspan="2">
          <Button
            title="返回主界面"
            type="warning"
            @click="backToSettings"
          >
            返回主界面
          </Button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import SortObject from '../utils/SortObject'
import IDSortTree from '../utils/IDSortTree'
import characters from '@dynamic/characters'
import Character from './Character'
import Button from './Button'
import Vue from 'vue'

export default {
  name: 'Select',

  components: { Character, Button },

  props: ['gamelist', 'ranknum', 'face'],

  data: () => ({
    pair: [],
    bkpPair: [],
    questionCount: 1,
    currentRank: 0,
    isPrevious: false,
  }),

  created () {
    this.rtNode = new SortObject('!root')
    for (const char of characters) {
      for (const tag of char[3]) {
        if (this.gamelist.includes(tag)) {
          this.rtNode.add(new SortObject(...char), false)
          break
        }
      }
    }
    this.pair = this.ask(this.rtNode)
    this.bkpRtNode = new IDSortTree()
    this.bkpRtNode.setupCTree()
    this.bkpRtNode.initTree(this.rtNode, this.bkpRtNode)
  },

  methods: {
    backToSettings () {
      this.$emit('next', 'Settings')
    },
    backup () {
      this.bkpPair = [this.pair[0], this.pair[1]]
      this.bkpRtNode.setupCTree()
      this.bkpRtNode.initTree(this.rtNode, this.bkpRtNode)
    },
    restore () {
      this.pair = [this.bkpPair[0], this.bkpPair[1]]
      this.bkpPair = null
      this.currentRank = 0
      this.rtNode = this.bkpRtNode.restoreCTree(this.bkpRtNode, null)
    },
    ask (node, pair) {
      if (pair) {
        const left = node.findSortObjectById(pair[0].id)
        const right = node.findSortObjectById(pair[1].id)
        if (left !== null && right !== null) {
          return [left, right]
        }
      }
      if (node.children.length === 0) {
        return false
      }
      if (node.children.length === 1) {
        this.currentRank = node.level() + 1
        return this.ask(node.children[0])
      }
      const both = [0, 0]
      while (true) {
        if (both[0] !== both[1]) {
          break
        }
        for (const i of [0, 1]) {
          both[i] = Math.floor(Math.random() * node.children.length)
        }
      }
      return [node.children[both[0]], node.children[both[1]]]
    },
    nextPair (back) {
      if (back) {
        this.pair = this.ask(this.rtNode, this.pair)
      } else {
        this.pair = this.ask(this.rtNode)
      }
      if (this.pair && this.pair[1].level() <= this.ranknum) {
        this.questionCount += 1
        return true
      }
      return false
    },
    moveOn (back) {
      const { ranknum, face } = this
      if (!this.nextPair(back)) {
        let ranking = []
        let node = this.rtNode
        for (let i = 0; i < ranknum; i++) {
          node = node.children[0]
          if (!node) {
            break
          }
          ranking.push(node)
        }
        this.$emit('next', 'Result', { ranking, face })
      }
    },
    selectChar (index) {
      this.backup()
      this.pair[index].add(this.pair[1 - index], false)
      this.isPrevious = false
      this.moveOn(false)
    },
    exclude (...indices) {
      this.backup()
      for (let i of indices) {
        this.pair[i].remove()
      }
      this.moveOn(false)
    },
    previous () {
      this.restore()
      this.questionCount -= 2
      this.isPrevious = true
      this.moveOn(true)
    },
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.emphasize
  color #d00

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
