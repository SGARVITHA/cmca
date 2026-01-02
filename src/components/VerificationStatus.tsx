import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Clock, CheckCircle } from 'lucide-react';

interface VerificationStatusProps {
  status: 'pending' | 'verified';
}

export default function VerificationStatus({ status }: VerificationStatusProps) {
  const context = useContext(AppContext);

  const handleGoToHome = () => {
    context?.setIsVerified(true);
    context?.navigateTo('home');
  };

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
            <Clock className="w-10 h-10 text-amber-600" />
          </div>
          
          <h1 className="text-blue-900 mb-3">Verification Pending</h1>
          
          <p className="text-slate-600 mb-6">
            Your account is currently under verification by the Municipality. This process typically takes 24-48 hours.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-blue-900">
              You will receive a notification once your account is verified.
            </p>
          </div>

          <div className="text-slate-500">
            <p>Status: <span className="text-amber-600">Pending</span></p>
          </div>

          {/* For demo purposes, allow continuing */}
          <button
            onClick={handleGoToHome}
            className="mt-6 w-full py-3 text-blue-600 hover:text-blue-700 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all"
          >
            Continue (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-blue-900 mb-3">Verified!</h1>
        
        <p className="text-slate-600 mb-6">
          Your account has been successfully verified by the Municipality. You can now access all features of MyArea.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-900">
            Welcome to the MyArea community!
          </p>
        </div>

        <button
          onClick={handleGoToHome}
          className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
