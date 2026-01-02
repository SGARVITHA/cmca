import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, AlertTriangle, MapPin, Clock, Info } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'High Alert',
    title: 'Heavy Rainfall Warning',
    description: 'Heavy rainfall expected in the next 24 hours. Avoid low-lying areas.',
    fullDescription: 'The Meteorological Department has issued a heavy rainfall warning for our area. Expected rainfall: 100-150mm in the next 24 hours. Residents in low-lying areas are advised to move to higher ground. Keep emergency supplies ready and avoid unnecessary travel.',
    time: '2 hours ago',
    location: 'All sectors',
    severity: 'high',
    instructions: [
      'Stay indoors if possible',
      'Keep emergency supplies ready',
      'Avoid driving through flooded areas',
      'Monitor weather updates regularly',
      'Keep phone charged',
    ],
    contactInfo: {
      emergency: '100',
      municipality: '1800-123-4567',
    },
  },
  {
    id: 2,
    type: 'Medium Alert',
    title: 'Road Closure Notice',
    description: 'Main Street closed for repairs until January 5th.',
    fullDescription: 'Main Street between Sectors A and B will be closed for emergency repairs from January 3rd to January 5th, 2026. Alternative routes are available via Ring Road. Please plan your travel accordingly.',
    time: '5 hours ago',
    location: 'Main Street, Sectors A-B',
    severity: 'medium',
    instructions: [
      'Use Ring Road as alternative route',
      'Allow extra travel time',
      'Follow traffic diversions',
      'Avoid the area during peak hours',
    ],
    contactInfo: {
      trafficControl: '1800-123-4568',
    },
  },
];

interface AlertDetailPageProps {
  alertId: number | null;
}

export default function AlertDetailPage({ alertId }: AlertDetailPageProps) {
  const context = useContext(AppContext);

  const alert = alerts.find(a => a.id === alertId);

  if (!alert) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Alert not found</p>
          <button
            onClick={() => context?.navigateTo('safety')}
            className="text-teal-600 hover:text-teal-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const severityColors = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      badge: 'bg-red-600',
      icon: 'text-red-600',
    },
    medium: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      badge: 'bg-amber-600',
      icon: 'text-amber-600',
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      badge: 'bg-blue-600',
      icon: 'text-blue-600',
    },
  };

  const colors = severityColors[alert.severity as keyof typeof severityColors];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => context?.navigateTo('safety')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Alert Details</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Alert Header */}
          <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 mb-6`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 ${colors.badge} rounded-full flex items-center justify-center flex-shrink-0`}>
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 ${colors.badge} text-white rounded-full text-sm`}>
                    {alert.type}
                  </span>
                  <span className="text-sm text-gray-500">{alert.time}</span>
                </div>
                <h2 className={`${colors.text} mb-2`}>{alert.title}</h2>
                <p className={`${colors.text} opacity-80`}>{alert.description}</p>
              </div>
            </div>
          </div>

          {/* Location & Time */}
          <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-500">Affected Area</p>
                <p>{alert.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p>{alert.time}</p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-teal-600" />
              <span>Details</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">{alert.fullDescription}</p>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Safety Instructions</h3>
            <ul className="space-y-2">
              {alert.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
            <h3 className="text-teal-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              {Object.entries(alert.contactInfo).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <a
                    href={`tel:${value}`}
                    className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                  >
                    <span>{value}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Share/Report */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              For more information or to report related issues, contact your local municipality office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
