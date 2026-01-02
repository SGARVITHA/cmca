import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Edit2, 
  Globe,
  Shield,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function ProfilePage() {
  const context = useContext(AppContext);
  const { t, language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    if (window.confirm(t('profile.logoutConfirm'))) {
      context?.navigateTo('language');
      context?.setUserProfile(null);
      context?.setIsVerified(false);
    }
  };

  const getLanguageName = () => {
    switch (language) {
      case 'en': return 'English';
      case 'ta': return 'தமிழ்';
      case 'hi': return 'हिन्दी';
      default: return 'English';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => context?.navigateTo('home')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>{t('profile.title')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('profile.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <h2 className="text-gray-900 mb-1">
                  {context?.userProfile?.firstName || 'John'} {context?.userProfile?.lastName || 'Doe'}
                </h2>
                <p className="text-gray-600">
                  {context?.userProfile?.age || '35'} {t('profile.yearsOld')}
                </p>
                <p className="text-gray-500 text-sm">
                  {context?.userProfile?.gender || 'Male'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-500 text-xs mb-1">{t('profile.address')}</p>
                <p className="text-gray-700">
                  {context?.userProfile?.address.houseNo || '123'},{' '}
                  {context?.userProfile?.address.street || 'Main Street'},{' '}
                  {context?.userProfile?.address.area || 'Sector A'}
                </p>
                <p className="text-gray-700">
                  {t('home.wardSector')} {context?.userProfile?.address.ward || '12'},{' '}
                  {context?.userProfile?.address.city || 'Chennai'} -{' '}
                  {context?.userProfile?.address.pincode || '600001'}
                </p>
              </div>
            </div>

            {context?.userProfile?.emergencyContacts && context.userProfile.emergencyContacts.length > 0 && (
              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-2">{t('profile.emergencyContacts')}</p>
                  {context.userProfile.emergencyContacts.map((contact, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-gray-700">
                        {contact.name} ({contact.relation})
                      </p>
                      <p className="text-gray-600">{contact.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {context?.userProfile?.volunteerInterest && context.userProfile.volunteerAreas && context.userProfile.volunteerAreas.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-500 text-xs mb-2">{t('profile.volunteerInterests')}</p>
                <div className="flex flex-wrap gap-2">
                  {context.userProfile.volunteerAreas.map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {context?.userProfile?.servicesProvided && context.userProfile.serviceDetails && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-gray-500 text-xs mb-2">{t('profile.serviceProvided')}</p>
                <p className="text-gray-900">{context.userProfile.serviceDetails.businessName}</p>
                <p className="text-gray-600">{context.userProfile.serviceDetails.type}</p>
                <p className="text-gray-600">{context.userProfile.serviceDetails.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-gray-900 px-6 py-4 border-b border-gray-100">
            {t('profile.settings')}
          </h3>

          <button 
            onClick={() => context?.navigateTo('language')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{t('profile.language')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">{getLanguageName()}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* About & Legal Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-gray-900 px-6 py-4 border-b border-gray-100">
            {t('profile.aboutLegal')}
          </h3>

          <button 
            onClick={() => context?.navigateTo('about')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{t('profile.aboutMyArea')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => context?.navigateTo('privacy')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{t('profile.privacy')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => context?.navigateTo('terms')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{t('profile.terms')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h3 className="text-gray-900 px-6 py-4 border-b border-gray-100">
            {t('profile.support')}
          </h3>

          <button 
            onClick={() => context?.navigateTo('help-support')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{t('profile.helpSupport')}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>{t('profile.logout')}</span>
        </button>

        {/* Version Info */}
        <div className="text-center text-gray-500 text-xs py-4">
          MyArea v1.0.0
        </div>
      </div>
    </div>
  );
}
