import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { getLanguage } from '../utils/language'
import en from '../languages/en.json'
import vi from '../languages/vi.json'

const language = getLanguage()
async function initializeI18n() {
  await i18n.use(initReactI18next).init({
    lng: language.code,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
  })
}
initializeI18n().catch((err)=>{
  console.log(err);
})

export default i18n
