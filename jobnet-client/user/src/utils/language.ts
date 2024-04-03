interface Language {
  code: string
}

export const getLanguage = () => {
  const languageString = localStorage.getItem('language')

  if (!languageString) {
    const language = { code: 'en' } as Language
    localStorage.setItem('language', JSON.stringify(language))
    return language
  }
  return JSON.parse(languageString) as Language
}

export const setLanguage = (code: string) => {
  localStorage.setItem('language', JSON.stringify({ code }))
}
