import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { LogIn, UserPlus } from 'lucide-react';

export default function AuthChoice() {
  const context = useContext(AppContext);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-teal-900 mb-3 text-3xl">{t('auth.welcome')}</h1>
          <p className="text-gray-600 text-lg">
            {t('auth.chooseOption')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => context?.navigateTo('login')}
            className="w-full p-6 bg-white border-2 border-teal-600 rounded-2xl hover:bg-teal-50 transition-all group shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <LogIn className="w-7 h-7 text-teal-600" />
              </div>
              <div className="text-left flex-1">
                <div className="text-teal-900 mb-1 text-lg">{t('auth.login')}</div>
                <p className="text-gray-600">
                  {t('auth.loginDesc')}
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => context?.navigateTo('signup')}
            className="w-full p-6 bg-teal-600 border-2 border-teal-600 rounded-2xl hover:bg-teal-700 transition-all group shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center group-hover:bg-teal-600 transition-colors">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="text-white mb-1 text-lg">{t('auth.signup')}</div>
                <p className="text-teal-100">
                  {t('auth.signupDesc')}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}