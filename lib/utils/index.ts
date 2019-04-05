import SortNode from './SortNode'

declare const TH_CHAR_PATH: string

export function getCharImage (id: number, face: string) {
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}

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
