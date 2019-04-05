// @ts-ignore
import { ranks, charMap } from '../data'

declare const TH_CHAR_PATH: string

export function getCharImage (id: number, face: string) {
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}

function getAverage (list: number[]) {
  return list.reduce((sum, item) => sum + item, 0) / list.length
}

function getRank (name: string, ranks: string[]) {
  const index = ranks.indexOf(name)
  return index === -1 ? ranks.length : index
}

export function getPreference (userRanking: string[], tagMap: Record<string, string>) {
  const { length } = userRanking
  const popRanking = ranks.cn7.slice(0, length) as string[]
  const rankingChars = Array.from(new Set([...popRanking, ...userRanking]))

  const preference = []

  for (const tag in tagMap) {
    const name = tagMap[tag]

    const relatedChars = rankingChars.filter((name) => {
      return charMap[name].tags.includes(tag)
    })
    if (!relatedChars.length) continue

    const value = getAverage(relatedChars.map((name) => {
      const userRank = getRank(name, userRanking)
      const popRank = getRank(name, popRanking)
      return Math.tanh((popRank - userRank) / length) / (3 + userRank)
    }))

    preference.push({ tag, name, value })
  }

  return preference.sort((a, b) => a.value > b.value ? -1 : 1)
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
