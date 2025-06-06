import MacScrollbar from '@/components/common/MacScrollBar';
import { SpinnerLoading } from '@/components/loadings';
import { supportedLanguages } from '@i18n/config';
import { useI18n } from '@i18n/hooks';
import { Suspense, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ScrollRestoration, useLocation } from 'react-router';
import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const { t, changeLanguage } = useI18n('common');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const ref = useRef(null);

  const toggleDarkMode = async () => {
    if (!ref.current) return;

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(e => !e);
      });
    }).ready;

    const { top, left } = ref.current.getBoundingClientRect();
    const x = left;
    const y = top;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    // Calculates the radius of circle that can cover the screen
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 1000,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md w-full fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <ul className="flex gap-8">
            <li>
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                {t('nav.about')}
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <select
              onChange={e => changeLanguage(e.target.value)}
              className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {supportedLanguages.map(lang => (
                <option key={lang} value={lang} className="bg-white dark:bg-gray-800">
                  {lang.toUpperCase()}
                </option>
              ))}
            </select>
            <button
              ref={ref}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>
      <MacScrollbar>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-300">
          <main className="flex-1 container mx-auto px-4 py-8">
            <Suspense fallback={<SpinnerLoading />} key={location.key}>
              <Outlet />
            </Suspense>
          </main>
          <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto w-full">
            <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
              <p>{t('footer.copyright')}</p>
            </div>
          </footer>
          <ScrollRestoration />
        </div>
      </MacScrollbar>
    </>
  );
};

export default MainLayout;
