<template>
  <div>
    <div class="section">
      <p class="title">
        <Checkbox v-model="allSelected" label="所有作品"/>
      </p>
      <ul>
        <li>
          <p>
            <Checkbox v-model="allStgSelected" label="正作"/>
          </p>
          <ul>
            <li class="inline medium" v-for="(game, index) in games.integer" :key="index">
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
            <Checkbox v-model="otherSelected" label="外传"/>
          </p>
          <ul>
            <li class="inline medium" v-for="(game, index) in games.others" :key="index">
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
            <Checkbox v-model="oldSelected" label="旧作"/>
          </p>
          <ul>
            <li class="inline medium" v-for="(game, index) in games.old" :key="index">
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
    <div class="section">
      <p class="list">
        <span style="margin-right: 1em">选择排名数：</span>
        <ul class="inline">
          <li class="inline short" v-for="(num, index) in ranks" :key="index">
            <Radio :label="num" v-model="ranknum"/>
          </li>
        </ul>
      </p>
      <p class="list">
        <span>选择立绘表情：</span>
        <ul class="inline">
          <li class="inline short" v-for="(key, value) in faces" :key="value">
            <Radio :label="value" v-model="face">{{ key }}</Radio>
          </li>
        </ul>
      </p>
    </div>
    <div class="button-container">
      <Button
        @click="$emit('next', 'Select', { gamelist, ranknum, face })"
        :disabled="!gamelist.length"
      >
        开始
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

import Radio from '@theme-uzkk/components/Radio'
import Button from '@theme-uzkk/components/Button'
import Checkbox from '@theme-uzkk/components/Checkbox'
import { games, faces } from '../data'

const ranks = [1, 5, 7, 10, 20, 50, 100]

export default {
  components: { Button, Checkbox, Radio },

  data: () => ({
    ranknum: 1,
    face: 'default',
    gamelist: 'abcdefghijkABDE',
  }),

  created () {
    this.faces = faces
    this.ranks = ranks
    this.games = games
    this.stg = 'abcdefghijk'
    this.other = 'ABDE'
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
