import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, Lock, Shield, Eye, Database, UserX } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1>Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-teal-600" />
            </div>
          </div>

          <h2 className="text-teal-900 mb-6 text-center">Your Privacy Matters</h2>

          <div className="space-y-8">
            {/* Data Collection */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Data Collection</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We collect only essential personal information required for community safety and service delivery. This includes your name, contact details, address, and emergency contact information.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Usage */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">How We Use Your Data</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Data is used solely for community safety and service delivery purposes:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Sending official notices and emergency alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Connecting you with community services</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Coordinating volunteer activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Verifying your identity for security</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Sharing */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserX className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">No Third-Party Sales</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>No data is sold to third parties.</strong> Your information remains within the municipality system and is shared only with authorized personnel for official purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Sharing */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Emergency Information Sharing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Emergency information is shared only during alerts and with your designated emergency contacts. This is essential for ensuring your safety during critical situations.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Data Protection</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All data is protected under applicable data protection laws and municipality security protocols. We use industry-standard encryption and security measures to safeguard your information.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h3 className="text-teal-900 mb-3">Your Rights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Access your personal data at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Request corrections to your information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Opt-out of non-essential communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Request account deletion (subject to legal requirements)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Last updated: January 2, 2026
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                For privacy concerns, contact your local municipality office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
