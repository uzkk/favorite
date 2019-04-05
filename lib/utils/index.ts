<<<<<<< HEAD
=======
import SortNode from './SortNode'

>>>>>>> 8fe47d01b1fb79b5286d7704300f40ea48fafe98
declare const TH_CHAR_PATH: string

export function getCharImage (id: number, face: string) {
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}
<<<<<<< HEAD
=======

export function getPreference (ranking: SortNode[], tagMap: Record<string, string>) {
  const preference = []
  const weights = ranking.map((char, index) => {
    return 1 / ((index + 4) * (1 + 1.1 ** (index + 1 - char.meta.rank_cn7)))
  })

  for (const tag in tagMap) {
    preference.push({
      tag,
      name: tagMap[tag],
      value: weights.filter((w, index) => {
        return ranking[index].tags.includes(tag)
      }).reduce((sum, w) => sum + w, 0),
    })
  }

  return preference
    .filter(p => p.value > 0)
    .sort((a, b) => a.value - b.value > 0 ? -1 : 1)
}

export function group (length, groupLength, startIndex) {
  const groups = new Array(Math.ceil(length / groupLength)).fill(undefined)
  groups[groups.length - 1] = length % groupLength
  return groups.map((_, index) => {
    if (index < groups.length - 1) {
      const start = groupLength * index + startIndex
      return ['sm', start, groupLength + start]
    }
    const end = length + startIndex
    return ['sm', end - (length % groupLength || groupLength), end]
  })
}
>>>>>>> 8fe47d01b1fb79b5286d7704300f40ea48fafe98
