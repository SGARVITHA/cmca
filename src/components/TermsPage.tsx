import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function TermsPage() {
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
          <h1>Terms & Conditions</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-teal-600" />
            </div>
          </div>

          <h2 className="text-teal-900 mb-6 text-center">Terms of Service</h2>

          <div className="space-y-8">
            {/* User Responsibilities */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">User Responsibilities</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By using MyArea, you agree to:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Provide accurate and truthful information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Keep your account credentials secure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Update your information promptly when it changes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>Use the platform responsibly and lawfully</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* SOS Misuse */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Emergency SOS Guidelines</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Misuse of SOS or false alerts may lead to account suspension.</strong> The emergency alert system is for genuine emergencies only. False or repeated misuse undermines community safety and may result in legal consequences.
                  </p>
                </div>
              </div>
            </div>

            {/* Account Verification */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Account Verification</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Municipality reserves the right to verify or reject accounts to ensure community safety and authenticity. Verification may take 24-48 hours and may require additional documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Providers */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Service Provider Listings</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Services listed are community-provided and subject to moderation. <strong>They are not government guarantees.</strong> The municipality does not endorse or guarantee the quality of services provided by third-party vendors. Users should exercise their own judgment when engaging services.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Guidelines */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Content Guidelines</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Users must not post or share:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>False, misleading, or harmful information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Content that violates laws or community standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Offensive, discriminatory, or hateful material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Spam or unsolicited commercial content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Municipality Rights */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Municipality Rights</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The municipality reserves the right to modify, suspend, or terminate the service at any time. We may also remove content, suspend accounts, or take other actions deemed necessary for community safety and platform integrity.
                  </p>
                </div>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Limitation of Liability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    While we strive to provide accurate and timely information, the municipality is not liable for any errors, delays, or damages arising from the use of this platform. Emergency services should always be contacted directly for urgent matters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <h3 className="text-teal-900 mb-3">Agreement</h3>
              <p className="text-gray-700 leading-relaxed">
                By using MyArea, you acknowledge that you have read, understood, and agree to these Terms and Conditions. Continued use of the platform constitutes acceptance of any updates to these terms.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                Last updated: January 2, 2026
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                For questions about these terms, contact your local municipality office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
