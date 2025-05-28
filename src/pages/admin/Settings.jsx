import { useState } from 'react'
import { useI18n } from '@i18n/hooks'

const Settings = () => {
  const { t } = useI18n('admin')
  const [settings, setSettings] = useState({
    general: {
      siteName: 'My Website',
      siteDescription: 'A modern web application',
      maintenanceMode: false
    },
    system: {
      allowRegistration: true,
      defaultLanguage: 'en',
      timezone: 'UTC'
    },
    notifications: {
      emailNotifications: true,
      adminNotifications: true
    },
    upload: {
      maxFileSize: 5,
      allowedTypes: 'jpg,png,pdf'
    }
  })

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Settings saved:', settings)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        {t('settings.title')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {t('settings.general.title')}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.general.siteName')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="siteName"
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.general.siteDescription')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="siteDescription"
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="maintenanceMode"
                      name="maintenanceMode"
                      type="checkbox"
                      checked={settings.general.maintenanceMode}
                      onChange={(e) => handleChange('general', 'maintenanceMode', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="maintenanceMode" className="font-medium text-gray-700 dark:text-gray-300">
                      {t('settings.general.maintenanceMode')}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {t('settings.system.title')}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="allowRegistration"
                      name="allowRegistration"
                      type="checkbox"
                      checked={settings.system.allowRegistration}
                      onChange={(e) => handleChange('system', 'allowRegistration', e.target.checked)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="allowRegistration" className="font-medium text-gray-700 dark:text-gray-300">
                      {t('settings.system.allowRegistration')}
                    </label>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="defaultLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.system.defaultLanguage')}
                </label>
                <div className="mt-1">
                  <select
                    id="defaultLanguage"
                    name="defaultLanguage"
                    value={settings.system.defaultLanguage}
                    onChange={(e) => handleChange('system', 'defaultLanguage', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="en">English</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.system.timezone')}
                </label>
                <div className="mt-1">
                  <select
                    id="timezone"
                    name="timezone"
                    value={settings.system.timezone}
                    onChange={(e) => handleChange('system', 'timezone', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="UTC">UTC</option>
                    <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {t('settings.notifications.title')}
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="emailNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.notifications.emailNotifications')}
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="adminNotifications"
                    name="adminNotifications"
                    type="checkbox"
                    checked={settings.notifications.adminNotifications}
                    onChange={(e) => handleChange('notifications', 'adminNotifications', e.target.checked)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="adminNotifications" className="font-medium text-gray-700 dark:text-gray-300">
                    {t('settings.notifications.adminNotifications')}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Settings */}
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              {t('settings.upload.title')}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="maxFileSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.upload.maxFileSize')}
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="maxFileSize"
                    id="maxFileSize"
                    value={settings.upload.maxFileSize}
                    onChange={(e) => handleChange('upload', 'maxFileSize', parseInt(e.target.value))}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="allowedTypes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('settings.upload.allowedTypes')}
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="allowedTypes"
                    id="allowedTypes"
                    value={settings.upload.allowedTypes}
                    onChange={(e) => handleChange('upload', 'allowedTypes', e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('settings.save')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings 