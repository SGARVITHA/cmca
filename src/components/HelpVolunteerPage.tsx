import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Calendar, MapPin, HandHeart, Heart, Users } from 'lucide-react';

const volunteerEvents = [
  {
    id: 1,
    title: 'Community Clean-up Drive',
    description: 'Join us in cleaning up the local park and surrounding areas. Help make our community cleaner and greener.',
    date: 'January 10, 2026',
    time: '9:00 AM - 12:00 PM',
    location: 'Central Park, Ward 12',
    organizer: 'Green Ward Initiative',
  },
  {
    id: 2,
    title: 'Food Distribution for Elderly',
    description: 'Help distribute meals to senior citizens in the community. Volunteers needed for cooking, packing, and delivery.',
    date: 'January 15, 2026',
    time: '11:00 AM - 2:00 PM',
    location: 'Community Center',
    organizer: 'Senior Care Society',
  },
  {
    id: 3,
    title: 'Tree Plantation Drive',
    description: 'Plant trees and contribute to a greener community. All necessary tools and saplings will be provided.',
    date: 'January 20, 2026',
    time: '7:00 AM - 10:00 AM',
    location: 'Main Street',
    organizer: 'Environment Committee',
  },
];

export default function HelpVolunteerPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();

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
          <h1>{t('help.title')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('help.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Need Help / Offer Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => context?.navigateTo('need-help')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-teal-500 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <HandHeart className="w-7 h-7 text-red-600" />
              </div>
              <h2 className="text-gray-900">{t('help.needHelp')}</h2>
            </div>
            <p className="text-gray-600">
              {t('help.requestDesc')}
            </p>
          </button>

          <button
            onClick={() => context?.navigateTo('offer-help')}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-teal-500 text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-7 h-7 text-green-600" />
              </div>
              <h2 className="text-gray-900">{t('help.offerHelp')}</h2>
            </div>
            <p className="text-gray-600">
              {t('help.offerDesc')}
            </p>
          </button>
        </div>

        {/* Volunteer Events Section */}
        <div>
          <h2 className="text-gray-900 mb-4">{t('help.upcomingEvents')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {volunteerEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => context?.setSelectedEvent?.(event)}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-teal-500 text-left"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-gray-900 flex-1">{event.title}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-teal-600">{t('help.showDetails')} →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
