import { useTranslation } from 'react-i18next'
import { defaultNamespace } from './config'

export const useMultiI18n = (namespaces) => {
  const { t } = useTranslation(namespaces)
  return { t }
}

export const useI18n = (ns = defaultNamespace) => {
  const { t, i18n } = useTranslation(ns)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return {
    t,
    i18n,
    changeLanguage
  }
} 