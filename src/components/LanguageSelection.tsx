import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage, Language } from '../context/LanguageContext';
import Logo from '../assets/logo.png';

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'ta' as Language, name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिन्दी' },
];

export default function LanguageSelection() {
  const context = useContext(AppContext);
  const { setLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleContinue = () => {
    if (selectedLanguage && context) {
      setLanguage(selectedLanguage);
      context.setLanguage(selectedLanguage);
      context.navigateTo('auth-choice');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-gray-100 flex flex-col items-center justify-center px-6 py-12">
  <div className="w-full max-w-2xl">
    {/* Logo and Title */}
    <div className="text-center mb-12">
     <div className="inline-flex items-center justify-center w-24 h-26 rounded-full mb-6 shadow-lg bg-white overflow-hidden">
  <img src={Logo} alt="App Logo" className="w-full h-full object-contain" />
</div>

      <h1 className="text-teal-900 mb-3 text-4xl">{t('app.name')}</h1>
      <p className="text-gray-600 max-w-md mx-auto text-lg">
        {t('app.tagline')}
      </p>
    </div>

        {/* Language Cards */}
        <div className="space-y-4 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full p-6 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
                selectedLanguage === lang.code
                  ? 'border-teal-600 bg-teal-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-teal-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-gray-900 mb-1 text-lg">{lang.name}</div>
                  <div className="text-gray-600 text-2xl">{lang.nativeName}</div>
                </div>
                <div
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedLanguage === lang.code
                      ? 'border-teal-600 bg-teal-600'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedLanguage === lang.code && (
                    <div className="w-3.5 h-3.5 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedLanguage}
          className={`w-full py-5 rounded-2xl transition-all text-lg shadow-md ${
            selectedLanguage
              ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('language.continue')}
        </button>
      </div>
    </div>
  );
}
