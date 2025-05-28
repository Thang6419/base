import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  defaultLanguage,
  fallbackLanguage,
  namespaces,
  defaultNamespace
} from './config'

// Import translations
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import viCommon from './locales/vi/common.json'
import viAuth from './locales/vi/auth.json'
import enAdmin from './locales/en/admin.json'
import viAdmin from './locales/vi/admin.json'

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    admin: enAdmin
  },
  vi: {
    common: viCommon,
    auth: viAuth,
    admin: viAdmin
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: fallbackLanguage,
    ns: namespaces,
    defaultNS: defaultNamespace,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n 