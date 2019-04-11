// @ts-ignore
import { ranks, charMap, tags, charList } from '../data'
import SortNode from './SortNode'

function getRank (name: string, ranks: string[]) {
  const index = ranks.indexOf(name)
  return index === -1 ? ranks.length : index
}

export function getCharactersInRange (range: string, chars: string[] = charList) {
  return chars.filter((name) => {
    for (const char of charMap[name].appearence) {
      if (range.includes(char)) return true
    }
    return false
  })
}

export function getPreference (userRanking: string[], range: string) {
  const { length } = userRanking
  let denominator = 0
  const popRanking = getCharactersInRange(range, ranks.cn7).slice(0, length)
  const rankingChars = Array
    .from(new Set([...popRanking, ...userRanking]))
    .map((name) => {
      const userRank = getRank(name, userRanking)
      const popRank = getRank(name, popRanking)
      const weight = 1 / (2 + userRank)
      denominator += weight
      return {
        node: charMap[name] as SortNode,
        value: Math.tanh((popRank - userRank) / length) * weight,
      }
    })

  const preference = []
  for (const tag in tags) {
    const name = tags[tag]

    const chars = rankingChars.filter(({ node }) => node.tags.includes(tag))
    if (!chars.length) continue

    const value = chars.reduce((sum, { value }) => sum + value, 0) / denominator
    preference.push({ tag, name, value })
  }

  return preference
    .filter(p => p.value > 0)
    .sort((a, b) => a.value > b.value ? -1 : 1)
}

type Group = [string, number, number]

function group (length: number, groupLength: number, startIndex: number = 0) {
  length -= startIndex
  const groups = new Array(Math.ceil(length / groupLength)).fill(undefined)
  groups[groups.length - 1] = length % groupLength
  return groups.map((_, index): Group => {
    if (index < groups.length - 1) {
      const start = groupLength * index + startIndex
      return ['sm', start, groupLength + start]
    }
    const end = length + startIndex
    return ['sm', end - (length % groupLength || groupLength), end]
  })
}

const groupMap: Record<number, (length: number) => Group[]> = {
  1 (length) {
    return group(length, 1)
  },
  2 (length) {
    switch (length % 2) {
      case 0: return group(length, 2)
      case 1: return [['lg', 0, 1], ...group(length, 2, 1)]
    }
  },
  3 (length) {
    switch (length % 3) {
      case 0: return [['lg', 0, 1], ['md', 1, 3], ...group(length, 3, 3)]
      case 1: return [['lg', 0, 1], ...group(length, 3, 1)]
      case 2: return [['lg', 0, 2], ...group(length, 3, 2)]
    }
  },
  4 (length) {
    if (length === 1) return [['lg', 0, 1]]
    switch (length % 4) {
      case 0: return [['lg', 0, 1], ['sm', 1, 4], ...group(length, 4, 4)]
      case 1: return [['lg', 0, 2], ['sm', 2, 5], ...group(length, 4, 5)]
      case 2: return [['lg', 0, 2], ...group(length, 4, 2)]
      case 3: return [['lg', 0, 1], ['md', 2, 3], ...group(length, 4, 3)]
    }
  },
  5 (length) {
    if (length === 1) return [['lg', 0, 1]]
    if (length === 2) return [['lg', 0, 2]]
    if (length === 3) return [['lg', 0, 1], ['md', 1, 3]]
    switch (length % 5) {
      case 0: return [['lg', 0, 2], ['md', 2, 5], ...group(length, 5, 5)]
      case 1: return [['lg', 0, 1], ['md', 1, 3], ['md', 3, 6], ...group(length, 5, 6)]
      case 2: return [['lg', 0, 1], ['md', 1, 4], ['md', 4, 7], ...group(length, 5, 7)]
      case 3: return [['lg', 0, 2], ['md', 2, 5], ['md', 5, 8], ...group(length, 5, 8)]
      case 4: return [['lg', 0, 1], ['md', 1, 4], ...group(length, 5, 4)]
    }
  },
  6 (length) {
    if (length === 1) return [['lg', 0, 1]]
    if (length === 2) return [['lg', 0, 2]]
    if (length === 3) return [['lg', 0, 1], ['md', 1, 3]]
    if (length === 4) return [['lg', 0, 1], ['md', 1, 4]]
    if (length === 5) return [['lg', 0, 2], ['md', 2, 5]]
    switch (length % 6) {
      case 0: return [['lg', 0, 1], ['md', 1, 3], ['md', 3, 6], ...group(length, 6, 6)]
      case 1: return [['lg', 0, 1], ['md', 1, 4], ['md', 4, 7], ...group(length, 6, 7)]
      case 2: return [['lg', 0, 2], ['md', 2, 5], ['md', 5, 8], ...group(length, 6, 8)]
      case 3: return [['lg', 0, 2], ['md', 2, 5], ['md', 5, 9], ...group(length, 6, 9)]
      case 4: return [['lg', 0, 2], ['md', 2, 5], ['sm', 5, 10], ...group(length, 6, 10)]
      case 5: return [['lg', 0, 2], ['md', 2, 6], ['sm', 6, 11], ...group(length, 6, 11)]
    }
  },
}

// .main-container padding 1em (+ scrollbar 1em) = 48px
// .char-view = 16px * (10 + 1.5 * 2) = 208px
// .char-view.lg = 208px * 1.125 = 234px
// .char-view.sm = 208px * 0.75 = 156px
export function groupByWidth (length: number, width: number) {
  const groupLength = Math.max(Math.min(Math.floor((width - 49) / 156), 6), 1)
  return groupMap[groupLength](length)
}
