const VERSION = 1

const getFallback = () => ({
  ranknum: 1,
  face: 'default',
  range: 'abcdefghijkABDE',
})

export function getSettings () {
  const fallbackSettings = getFallback()

  if (typeof localStorage === 'undefined') return fallbackSettings

  const oldSettings = localStorage.getItem('uzkk.favorite.settings')
  if (!oldSettings) return fallbackSettings

  try {
    const { version, settings } = JSON.parse(oldSettings)
    if (version === VERSION) {
      return { ...fallbackSettings, ...settings }
    } else {
      return fallbackSettings
    }
  } catch (error) {
    console.warn('An error was encounted when parsing settings:\n' + oldSettings)
    return fallbackSettings
  }
}

export function setSettings (settings) {
  const userSettings = {}
  for (const key in getFallback()) {
    userSettings[key] = settings[key]
  }

  if (typeof localStorage !== 'undefined') {
    try {
      const newSettings = { version: VERSION, settings: userSettings }
      localStorage.setItem('uzkk.favorite.settings', JSON.stringify(newSettings))
    } catch (error) {
      console.warn('An error was encounted when stringifying settings.')
      console.warn(error)
    }
  }

  return userSettings
}

export function useFallback (settings) {
  const fallbackSettings = getFallback()
  return Object.assign(settings, fallbackSettings)
}
