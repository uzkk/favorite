// @ts-ignore
import { ranks, tags, charMap } from '../data'

declare const TH_CHAR_PATH: string

export function getCharImage (id: number, face: string) {
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}

export function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function getAverage (list: number[]) {
  return list.reduce((sum, item) => sum + item, 0) / list.length
}

function getRank (id: number, ranks: number[]) {
  const index = ranks.indexOf(id)
  return index === -1 ? ranks.length : index
}

function hasIntersection (str1: string, str2: string) {
  for (const char of str1) {
    if (str2.includes(char)) return true
  }
  return false
}

export function getPreference (userRanking: number[], range: string) {
  const { length } = userRanking
  const popRanking = (ranks.cn7 as number[])
    .filter(id => hasIntersection(charMap[id].appearence, range))
    .slice(0, length)
  const rankingChars = Array.from(new Set([...popRanking, ...userRanking]))

  const preference = []
  for (const tag in tags) {
    const name = tags[tag]

    const relatedChars = rankingChars.filter(id => charMap[id].tags.includes(tag))
    if (!relatedChars.length) continue

    const value = getAverage(relatedChars.map((name) => {
      const userRank = getRank(name, userRanking)
      const popRank = getRank(name, popRanking)
      return Math.tanh((popRank - userRank) / length) / (2 + Math.min(userRank, popRank))
    })) * 4

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

export function group5 (length: number) {
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
