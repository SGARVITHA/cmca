import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function NeedHelpPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [helpType, setHelpType] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const helpTypes = [
    'Medical Assistance',
    'Transportation',
    'Groceries',
    'Elderly Care',
    'Education/Tutoring',
    'Financial Help',
    'Legal Assistance',
    'Other',
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!helpType) {
      newErrors.helpType = t('validation.required');
    }

    if (!description) {
      newErrors.description = t('validation.required');
    } else if (description.length < 10) {
      newErrors.description = t('validation.helpDescMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setShowSuccess(true);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-gray-900 mb-3">{t('help.requestSent')}</h2>
          <p className="text-gray-600 mb-8">
            {t('help.requestSentDesc')}
          </p>
          <button
            onClick={() => context?.navigateTo('help-volunteer')}
            className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
          >
            {t('help.backToHelp')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => context?.navigateTo('help-volunteer')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>{t('help.requestHelp')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('help.requestDesc')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">
                {t('help.typeOfHelp')} *
              </label>
              <select
                value={helpType}
                onChange={(e) => {
                  setHelpType(e.target.value);
                  setErrors({ ...errors, helpType: '' });
                }}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none bg-white ${
                  errors.helpType ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                }`}
              >
                <option value="">{t('help.selectType')}</option>
                {helpTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.helpType && (
                <p className="text-red-600 text-sm mt-1">{errors.helpType}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('help.description')} * (min 10 chars)
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors({ ...errors, description: '' });
                }}
                rows={6}
                placeholder={t('help.describeNeed')}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                }`}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description ? (
                  <p className="text-red-600 text-sm">{errors.description}</p>
                ) : (
                  <span className="text-sm text-gray-500">{description.length} characters</span>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!helpType || !description}
              className={`w-full py-5 rounded-xl transition-all ${
                helpType && description
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('help.submitRequest')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
