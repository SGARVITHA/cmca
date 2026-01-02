import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, Shield } from 'lucide-react';

export default function AboutPage() {
  const context = useContext(AppContext);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => context?.navigateTo('profile')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>About MyArea</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-teal-600" />
            </div>
          </div>

          <h2 className="text-teal-900 mb-6 text-center">MyArea v1.0.0</h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>MyArea</strong> is a government-supported digital platform designed to connect residents with their local community and municipality.
            </p>

            <p>
              The application enables access to official notices, emergency alerts, community help, verified services, and volunteer opportunities within your ward or sector.
            </p>

            <p>
              MyArea aims to improve safety, transparency, and civic participation for citizens of all age groups.
            </p>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 mt-8">
              <h3 className="text-teal-900 mb-3">Our Mission</h3>
              <p className="text-gray-700">
                To empower communities through digital connectivity, fostering safer neighborhoods, transparent communication, and active civic engagement across all generations.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Official municipal notices and announcements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Real-time emergency alerts and safety notifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Community help and volunteer coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Local verified service provider directory</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Community polls and feedback mechanism</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Emergency SOS with instant notification</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Developed in collaboration with local municipalities to serve citizens better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
