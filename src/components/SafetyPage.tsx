import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Phone, Ambulance, Flame, Shield, AlertTriangle, Zap, Droplets } from 'lucide-react';

const emergencyNumbers = [
  {
    id: 1,
    name: 'Police',
    number: '100',
    icon: Shield,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Ambulance',
    number: '108',
    icon: Ambulance,
    color: 'red',
  },
  {
    id: 3,
    name: 'Fire',
    number: '101',
    icon: Flame,
    color: 'orange',
  },
  {
    id: 4,
    name: 'Municipality',
    number: '1800-123-4567',
    icon: Phone,
    color: 'green',
  },
];

const safetyAlerts = [
  {
    id: 1,
    type: 'road',
    title: 'Road Closure - Main Street',
    description: 'Main Street closed for repair work until January 15, 2026. Use alternate routes.',
    fullDescription: 'Due to major road repair and resurfacing work, Main Street will remain closed from Junction A to Junction B. The work includes pothole filling, drainage improvement, and road marking. Alternative routes via Park Avenue and Station Road are available. Expected completion: January 15, 2026.',
    date: 'January 2, 2026',
    severity: 'medium',
    icon: AlertTriangle,
    affectedAreas: ['Ward 12', 'Sector A'],
    contactPerson: 'Roads Department',
    contactNumber: '1800-111-2222',
  },
  {
    id: 2,
    type: 'power',
    title: 'Scheduled Power Outage',
    description: 'Power supply will be interrupted in Sector B on January 5 from 11 AM to 3 PM for maintenance.',
    fullDescription: 'Electricity Board has scheduled maintenance work on the main transformer in Sector B. Power supply will be interrupted on January 5, 2026, from 11:00 AM to 3:00 PM. This is necessary for upgrading the electrical infrastructure. Residents are advised to plan accordingly.',
    date: 'January 1, 2026',
    severity: 'low',
    icon: Zap,
    affectedAreas: ['Sector B', 'Ward 15'],
    contactPerson: 'Electricity Board',
    contactNumber: '1800-333-4444',
  },
  {
    id: 3,
    type: 'water',
    title: 'Water Supply Maintenance',
    description: 'Water supply will be affected in Ward 12 on January 5 from 10 AM to 2 PM.',
    fullDescription: 'Municipal water department will conduct valve replacement and pipeline cleaning work. Water supply will be temporarily suspended in Ward 12 on January 5, 2026, from 10:00 AM to 2:00 PM. Store sufficient water in advance. Emergency water tankers will be available on request.',
    date: 'December 30, 2025',
    severity: 'medium',
    icon: Droplets,
    affectedAreas: ['Ward 12', 'Main Street Area'],
    contactPerson: 'Water Department',
    contactNumber: '1800-555-6666',
  },
  {
    id: 4,
    type: 'weather',
    title: 'Heavy Rain Warning',
    description: 'Meteorological department has issued heavy rain warning for January 8-10. Please take necessary precautions.',
    fullDescription: 'The Regional Meteorological Department has issued a heavy rainfall warning for our area from January 8-10, 2026. Expected rainfall: 80-120mm. Residents are advised to: avoid unnecessary travel, secure outdoor items, keep emergency supplies ready, and stay away from low-lying areas prone to flooding. Emergency helpline: 1800-777-8888',
    date: 'December 28, 2025',
    severity: 'high',
    icon: AlertTriangle,
    affectedAreas: ['All Wards', 'Entire Municipality'],
    contactPerson: 'Disaster Management Cell',
    contactNumber: '1800-777-8888',
  },
];

export default function SafetyPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const handleAlertDetails = (alert: any) => {
    context?.navigateTo('alert-detail', { alertId: alert.id });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-amber-500 bg-amber-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-slate-500 bg-slate-50';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      case 'orange':
        return 'bg-orange-100 text-orange-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-red-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => context?.navigateTo('home')}
            className="p-2 hover:bg-red-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>{t('safety.title')}</h1>
        </div>
        <p className="text-red-100 ml-14">
          {t('safety.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Emergency Numbers */}
        <div>
          <h2 className="text-gray-900 mb-4">{t('safety.emergencyNumbers')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {emergencyNumbers.map((emergency) => (
              <button
                key={emergency.id}
                onClick={() => handleCall(emergency.number)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all text-left"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${getIconColor(
                    emergency.color
                  )}`}
                >
                  <emergency.icon className="w-6 h-6" />
                </div>
                <h3 className="text-gray-900 mb-1">{emergency.name}</h3>
                <p className="text-gray-600">{emergency.number}</p>
                <div className="mt-3 flex items-center gap-2 text-blue-600">
                  <Phone className="w-4 h-4" />
                  <span>{t('safety.tapToCall')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Safety Alerts */}
        <div>
          <h2 className="text-gray-900 mb-4">{t('safety.safetyAlerts')}</h2>
          <div className="space-y-4">
            {safetyAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white border-l-4 rounded-2xl p-5 shadow-sm ${getSeverityColor(
                  alert.severity
                )}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      alert.severity === 'high'
                        ? 'bg-red-100'
                        : alert.severity === 'medium'
                        ? 'bg-amber-100'
                        : 'bg-blue-100'
                    }`}
                  >
                    <alert.icon
                      className={`w-5 h-5 ${
                        alert.severity === 'high'
                          ? 'text-red-600'
                          : alert.severity === 'medium'
                          ? 'text-amber-600'
                          : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900">{alert.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          alert.severity === 'high'
                            ? 'bg-red-200 text-red-800'
                            : alert.severity === 'medium'
                            ? 'bg-amber-200 text-amber-800'
                            : 'bg-blue-200 text-blue-800'
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-500 text-xs">{alert.date}</p>
                      <button
                        onClick={() => handleAlertDetails(alert)}
                        className="text-teal-600 hover:text-teal-700 text-sm"
                      >
                        {t('safety.moreDetails')} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="text-blue-900 mb-3">{t('safety.safetyTips')}</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t('safety.tip1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t('safety.tip2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t('safety.tip3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>{t('safety.tip4')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
