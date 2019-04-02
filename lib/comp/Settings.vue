<template>
  <div>
    <div class="option-container">
      <p class="title">
        <Checkbox v-model="allSelected" label="所有作品全选"/>
      </p>
      <ul>
        <li>
          <p>
            <Checkbox v-model="allStgSelected" label="正作 STG 全选"/>
          </p>
          <ul>
            <li class="game-item" v-for="(game, index) in games.integer" :key="index">
              <Checkbox
                :value="gamelist.includes(game.tag)"
                :label="game.name"
                @update="toggleGame(game.tag)"
              />
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Checkbox v-model="otherSelected" label="外传作品全选"/>
          </p>
          <ul>
            <li class="game-item" v-for="(game, index) in games.others" :key="index">
              <Checkbox
                :value="gamelist.includes(game.tag)"
                :label="game.name"
                @update="toggleGame(game.tag)"
              />
            </li>
          </ul>
        </li>
        <li>
          <p>
            <Checkbox v-model="oldSelected" label="旧作全选"/>
          </p>
          <ul>
            <li class="game-item" v-for="(game, index) in games.old" :key="index">
              <Checkbox
                :value="gamelist.includes(game.tag)"
                :label="game.name"
                @update="toggleGame(game.tag)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="option-container">
      <div class="tac">
        选择排名数：
        <span class="choice-item opt-item" v-for="(num, index) in ranks" :key="index">
          <input type="radio" :value="num" v-model="ranknum">
          <label>{{ num }}</label>
        </span>
      </div>
      <div class="tac">
        选择立绘表情：
        <span class="choice-item opt-item" v-for="(key, value) in faces" :key="value">
          <input type="radio" :value="value" v-model="face">
          <label>{{ key }}</label>
        </span>
      </div>
    </div>
    <div class="start-btn-container tac">
      <Button
        class="start-btn"
        @click="$emit('next', 'Select', { gamelist, ranknum, face })"
        :disabled="!gamelist.length"
      >
        开始
      </Button>
    </div>
  </div>
</template>

<script>

import games from '../data/games'
import Button from './Button'
import Checkbox from './Checkbox'
import { faces } from './utils'

const ranks = [1, 5, 7, 10, 20]

export default {
  components: { Button, Checkbox },

  data: () => ({
    ranknum: 1,
    face: 'default',
    gamelist: 'abcdefghijk',
  }),

  created () {
    this.faces = faces
    this.ranks = ranks
    this.games = games
    this.stg = 'abcdefghijk'
    this.other = 'ABCDE'
    this.old = 'FGHIJ'
    this.all = this.other + this.old + this.stg
  },

  computed: {
    allSelected: {
      get () {
        return this.gamelist.length === this.all.length
      },
      set (value) {
        this.gamelist = value ? this.all : ''
      },
    },
    allStgSelected: {
      get () {
        for (let game of this.stg) {
          if (!this.gamelist.includes(game)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const noSTG = this.gamelist.match(/^[A-Z]*/)[0]
        this.gamelist = noSTG + (value ? this.stg : '')
      },
    },
    otherSelected: {
      get () {
        for (let game of this.other) {
          if (!this.gamelist.includes(game)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const STG = this.gamelist.match(/[F-Za-z]*$/)[0]
        this.gamelist = (value ? this.other : '') + STG
      },
    },
    oldSelected: {
      get () {
        for (let game of this.old) {
          if (!this.gamelist.includes(game)) {
            return false
          }
        }
        return true
      },
      set (value) {
        const STG = this.gamelist.match(/[a-z]*$/)[0]
        const other = this.gamelist.match(/^[A-E]*/)[0]
        this.gamelist = other + (value ? this.old : '') + STG
      },
    },
  },

  methods: {
    toggleGame (tag) {
      const index = this.gamelist.indexOf(tag)
      const chars = this.gamelist.split('')
      if (index > -1) {
        chars.splice(index, 1)
        this.gamelist = chars.join('')
      } else {
        chars.push(tag)
        this.gamelist = chars.sort().join('')
      }
    },
  },
}

</script>

<style lang="stylus" scoped>

.tac
  text-align center

.option-container
  margin 1em auto
  padding 2em
  border-radius .5em
  background-color #fff
  max-width 1080px

  > :first-child
    margin-top 0

  > :last-child
    margin-bottom 0

p, ul
  margin 0.6em 0

p.title
  font-weight bold

ul
  line-height 1.6
  padding-inline-start 1.6em

li
  list-style-type none

li.game-item
  display inline-block
  width 9em

.opt-item
  display inline-block
  width 4em

.start-btn-container
  margin 2em auto
  width 30%

.start-btn
  width 100%
  display block

</style>
