import RANK_CN7 from './rank_cn7'

import SortNode from '../utils/SortNode'
import characters from './characters'
import games from './games'
import tags from './tags'

export const faces = {
  default: '正常',
  smiling: '笑脸',
  trauma: '疮痍',
}

const rankMap = {}
const charMap = {}
characters.forEach((rawChar) => {
  const char = new SortNode(...rawChar)
  charMap[char.name] = char
  rankMap[char.meta.alias_cn || char.name] = char.name
})

function filterRanks (ranks) {
  return ranks.map((name) => {
    if (!(name in rankMap)) return
    return rankMap[name]
  }).filter(n => n)
}

export const ranks = {
  cn7: filterRanks(RANK_CN7),
}

export { characters, games, tags, charMap }
