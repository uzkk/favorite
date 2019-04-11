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

export function group (length: number, groupLength: number, startIndex: number) {
  const groups = new Array(Math.ceil(length / groupLength)).fill(undefined)
  groups[groups.length - 1] = length % groupLength
  return groups.map((_, index): [string, number, number] => {
    if (index < groups.length - 1) {
      const start = groupLength * index + startIndex
      return ['sm', start, groupLength + start]
    }
    const end = length + startIndex
    return ['sm', end - (length % groupLength || groupLength), end]
  })
}

export function group5 (length: number): [string, number, number][] {
  switch (length) {
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
      ...group(length - 5, 5, 5),
    ]
  }
}
