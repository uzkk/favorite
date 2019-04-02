export function getCharImage (id, face) {
  // const TH_CHAR_PATH = 'https://vp.uzkk.net/assets/th-char'
  return `${TH_CHAR_PATH}/${face}/c${String(id).padStart(3, '0')}.png`
}

export const faces = {
  default: '正常',
  smiling: '笑脸',
}
