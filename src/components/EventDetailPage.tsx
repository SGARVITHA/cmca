import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Calendar, MapPin, User, Users, CheckCircle, X } from 'lucide-react';

export default function EventDetailPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [hasJoined, setHasJoined] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const event = context?.selectedEvent;

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{t('common.error')}</p>
          <button
            onClick={() => context?.navigateTo('help-volunteer')}
            className="text-teal-600 hover:text-teal-700"
          >
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  const handleJoinClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmJoin = () => {
    setShowConfirmModal(false);
    setHasJoined(true);
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header */}
        <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => context?.navigateTo('help-volunteer')}
              className="p-2 hover:bg-teal-700 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>{t('event.title')}</h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-teal-900 mb-4">{event.title}</h2>

            {/* Date & Time */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('event.dateTime')}</p>
                  <p>{event.date} • {event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('event.location')}</p>
                  <p>{event.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-500">{t('event.organizer')}</p>
                  <p>{event.organizer}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">{t('event.description')}</h3>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Map Placeholder */}
            <div className="mb-6">
              <h3 className="text-gray-900 mb-3">{t('event.location')}</h3>
              <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-gray-200">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {hasJoined ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-green-900">{t('event.joined')}</p>
                </div>
              </div>
            ) : (
              <button
                onClick={handleJoinClick}
                className="w-full py-5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
              >
                {t('event.joinEvent')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-gray-900 mb-4">{t('event.confirmJoin')}</h2>
            <p className="text-gray-600 mb-8">
              {t('event.joinConfirmation')}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                {t('event.cancel')}
              </button>
              <button
                onClick={handleConfirmJoin}
                className="flex-1 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
              >
                {t('event.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-6 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-3">{t('event.registrationSuccess')}</h2>
            <p className="text-gray-600 mb-8">
              {t('event.registrationSuccessDesc')}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
            >
              {t('event.ok')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
