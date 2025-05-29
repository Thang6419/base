import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Settings() {
  const { t } = useTranslation('admin')
  const [settings, setSettings] = useState({
    siteName: 'My Website',
    siteDescription: 'A modern web application',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      sms: false
    }
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement settings save
    console.log('Settings saved:', settings)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {t('settings.title')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.general')}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                {t('settings.siteName')}
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                {t('settings.siteDescription')}
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                rows={3}
                value={settings.siteDescription}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.preferences')}
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                {t('settings.language')}
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                {t('settings.theme')}
              </label>
              <select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="light">{t('settings.lightTheme')}</option>
                <option value="dark">{t('settings.darkTheme')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('settings.notifications')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email"
                name="email"
                checked={settings.notifications.email}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="email" className="ml-2 block text-sm text-gray-900">
                {t('settings.emailNotifications')}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="push"
                name="push"
                checked={settings.notifications.push}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="push" className="ml-2 block text-sm text-gray-900">
                {t('settings.pushNotifications')}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms"
                name="sms"
                checked={settings.notifications.sms}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="sms" className="ml-2 block text-sm text-gray-900">
                {t('settings.smsNotifications')}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {t('settings.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings 