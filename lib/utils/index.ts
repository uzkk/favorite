declare const TH_CHAR_PATH: string

export function getCharImage (id: number, face: string) {
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}
