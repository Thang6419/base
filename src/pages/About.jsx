import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation('common')

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t('about.title')}
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            {t('about.description')}
          </p>
        </div>

        {/* Team section */}
        <div className="mt-24">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            {t('about.team.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-500 text-center">
            {t('about.team.description')}
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((member) => (
              <div key={member} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://images.unsplash.com/photo-${member === 1 ? '1472099645785-5658abf4ff4e' : member === 2 ? '1494790108377-be9c29b29330' : '1517841905240-472988babdf9'}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt={t(`about.team.member${member}.name`)}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {t(`about.team.member${member}.name`)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {t(`about.team.member${member}.role`)}
                    </p>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    {t(`about.team.member${member}.bio`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission section */}
        <div className="mt-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {t('about.mission.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {t('about.mission.description')}
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    {t('about.mission.point1')}
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    {t('about.mission.point2')}
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">
                    {t('about.mission.point3')}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Team working"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 