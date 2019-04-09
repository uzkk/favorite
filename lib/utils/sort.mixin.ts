import BackupTree from './BackupTree'

export default {
  data: () => ({
    currentPair: [],
    questionCount: 1,
    currentRank: 0,
    isPrevious: false,
  }),

  methods: {
    init () {
      this.currentPair = this.ask(this.root)
      this.backupTree = new BackupTree().setup(this.root)
    },
    backup () {
      this.backupPair = this.currentPair.slice()
      this.backupTree.setup(this.root)
    },
    restore () {
      this.currentPair = this.backupPair.slice()
      this.backupPair = null
      this.currentRank = 0
      this.root = this.backupTree.restore()
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
    getNextPair (back) {
      if (back) {
        this.currentPair = this.ask(this.root, this.currentPair)
      } else {
        this.currentPair = this.ask(this.root)
      }
      if (this.currentPair && this.currentPair[1].level() <= this.max) {
        this.questionCount += 1
        return true
      }
      return false
    },
    moveOn (back) {
      this.getNextPair(back)
    },
    selectChar (index) {
      this.backup()
      this.currentPair[index].add(this.currentPair[1 - index], false)
      this.isPrevious = false
      this.moveOn(false)
    },
    exclude (...indices) {
      this.backup()
      for (let i of indices) {
        this.currentPair[i].remove()
      }
      this.moveOn(false)
    },
    previous () {
      this.restore()
      this.questionCount -= 2
      this.isPrevious = true
      this.moveOn(true)
    },
    randomPick () {
      let index = Math.floor(Math.random() * 2)
      this.selectChar(index)
    },
    randomPickForAll () {
      let index = Math.floor(Math.random() * 2)
      this.currentPair[index].add(this.currentPair[1 - index], false)
      let pair = this.ask(this.root)
      while (pair && pair[1].level() <= this.max) {
        index = Math.floor(Math.random() * 2)
        pair[index].add(pair[1 - index], false)
        pair = this.ask(this.root)
      }
      this.moveOn(false)
    },
  },
}
