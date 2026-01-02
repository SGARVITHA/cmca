import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Bell, 
  AlertTriangle, 
  FileText, 
  HandHeart, 
  Wrench, 
  Shield,
  Home,
  BarChart3,
  User
} from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'emergency',
    title: 'Water Supply Interruption',
    description: 'Scheduled maintenance from 10 AM - 2 PM tomorrow',
    icon: AlertTriangle,
    color: 'red',
  },
  {
    id: 2,
    type: 'info',
    title: 'Road Closure Notice',
    description: 'Main Street will be closed for repair work',
    icon: AlertTriangle,
    color: 'amber',
  },
];

export default function HomePage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'home' | 'polls' | 'profile'>('home');
  const [showSOSModal, setShowSOSModal] = useState(false);

  const mainSections = [
    {
      id: 'notices',
      title: t('home.notices'),
      description: t('home.noticesDesc'),
      icon: FileText,
      color: 'blue',
      screen: 'notices' as const,
    },
    {
      id: 'help',
      title: t('home.helpVolunteer'),
      description: t('home.helpVolunteerDesc'),
      icon: HandHeart,
      color: 'green',
      screen: 'help-volunteer' as const,
    },
    {
      id: 'services',
      title: t('home.services'),
      description: t('home.servicesDesc'),
      icon: Wrench,
      color: 'purple',
      screen: 'services' as const,
    },
    {
      id: 'safety',
      title: t('home.safety'),
      description: t('home.safetyDesc'),
      icon: Shield,
      color: 'red',
      screen: 'safety' as const,
    },
  ];

  const handleSOSConfirm = () => {
    setShowSOSModal(false);
    alert(t('home.alertSentDesc'));
  };

  const handleTabChange = (tab: 'home' | 'polls' | 'profile') => {
    setActiveTab(tab);
    if (tab === 'polls') {
      context?.navigateTo('polls');
    } else if (tab === 'profile') {
      context?.navigateTo('profile');
    }
  };

  const handleAlertDetails = (alertId: number) => {
    context?.navigateTo('alert-detail', { alertId });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="text-teal-100">{t('home.wardSector')}</p>
              <p className="text-white">
                {context?.userProfile?.address.ward || 'Ward 12'}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-teal-700 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Alert Section */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-gray-900">{t('home.priorityAlerts')}</h2>
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white border-l-4 ${
                  alert.color === 'red' ? 'border-red-500' : 'border-amber-500'
                } rounded-2xl p-4 shadow-sm`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.color === 'red' ? 'bg-red-100' : 'bg-amber-100'
                    }`}
                  >
                    <alert.icon
                      className={`w-5 h-5 ${
                        alert.color === 'red' ? 'text-red-600' : 'text-amber-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{alert.title}</h3>
                    <p className="text-gray-600">{alert.description}</p>
                    <button 
                      onClick={() => handleAlertDetails(alert.id)}
                      className="text-teal-600 hover:text-teal-700 mt-2"
                    >
                      {t('home.viewDetails')} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Sections */}
        <div>
          <h2 className="text-gray-900 mb-4">{t('home.servicesTitle')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {mainSections.map((section) => (
              <button
                key={section.id}
                onClick={() => context?.navigateTo(section.screen)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${
                    section.color === 'blue'
                      ? 'bg-blue-100'
                      : section.color === 'green'
                      ? 'bg-green-100'
                      : section.color === 'purple'
                      ? 'bg-purple-100'
                      : 'bg-red-100'
                  }`}
                >
                  <section.icon
                    className={`w-6 h-6 ${
                      section.color === 'blue'
                        ? 'text-blue-600'
                        : section.color === 'green'
                        ? 'text-green-600'
                        : section.color === 'purple'
                        ? 'text-purple-600'
                        : 'text-red-600'
                    }`}
                  />
                </div>
                <h3 className="text-gray-900 mb-1">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* SOS Button */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200">
          <h3 className="text-red-900 mb-2">{t('home.emergencySos')}</h3>
          <p className="text-red-700 mb-4">
            {t('home.sosDesc')}
          </p>
          <button
            onClick={() => setShowSOSModal(true)}
            className="w-full py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
          >
            {t('home.sendSosAlert')}
          </button>
        </div>
      </div>

      {/* SOS Confirmation Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-red-900 mb-3">{t('home.confirmEmergency')}</h3>
            <p className="text-gray-700 mb-6">
              {t('home.sosConfirmation')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSOSModal(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
              >
                {t('home.cancel')}
              </button>
              <button
                onClick={handleSOSConfirm}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                {t('home.yesSend')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-around">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg ${
              activeTab === 'home' ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">{t('home.home')}</span>
          </button>
          <button
            onClick={() => handleTabChange('polls')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg ${
              activeTab === 'polls' ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">{t('home.polls')}</span>
          </button>
          <button
            onClick={() => handleTabChange('profile')}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg ${
              activeTab === 'profile' ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">{t('home.profile')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
