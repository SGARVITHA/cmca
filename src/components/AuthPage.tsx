import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Phone, Mail, Eye, EyeOff, Check, X } from 'lucide-react';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

interface PasswordValidation {
  minLength: boolean;
  maxLength: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
  noSpaces: boolean;
}

export default function AuthPage({ mode }: AuthPageProps) {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [inputMethod, setInputMethod] = useState<'phone' | 'email'>('phone');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const otpInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    minLength: false,
    maxLength: true,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    noSpaces: true,
  });

  useEffect(() => {
    if (showOtpScreen && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [showOtpScreen, resendTimer]);

  const validatePassword = (pwd: string) => {
    const validation: PasswordValidation = {
      minLength: pwd.length >= 8,
      maxLength: pwd.length <= 20,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[@#$%&!]/.test(pwd),
      noSpaces: !/\s/.test(pwd),
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(v => v);
  };

  const getPasswordStrength = (): 'weak' | 'medium' | 'strong' => {
    const validCount = Object.values(passwordValidation).filter(v => v).length;
    if (validCount <= 3) return 'weak';
    if (validCount <= 5) return 'medium';
    return 'strong';
  };

  const validatePhone = (phone: string): string | null => {
    if (!phone) return t('validation.phoneRequired');
    if (!/^\d+$/.test(phone)) return t('validation.phoneTenDigits');
    if (phone.length !== 10) return t('validation.phoneTenDigits');
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email) return t('validation.emailRequired');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return t('validation.emailInvalid');
    
    const disposableDomains = ['tempmail.com', 'throwaway.email', '10minutemail.com'];
    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) return t('validation.emailInvalid');
    
    return null;
  };

  const handleSendOtp = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate input
    if (inputMethod === 'phone') {
      const phoneError = validatePhone(phoneOrEmail);
      if (phoneError) newErrors.phoneOrEmail = phoneError;
    } else {
      const emailError = validateEmail(phoneOrEmail);
      if (emailError) newErrors.phoneOrEmail = emailError;
    }

    // Validate password
    if (!password) {
      newErrors.password = t('validation.required');
    } else if (!validatePassword(password)) {
      newErrors.password = t('password.requirements');
    }

    // Check for common passwords and personal info
    const lowerPassword = password.toLowerCase();
    if (lowerPassword.includes('password') || lowerPassword.includes('admin') || lowerPassword === '123456') {
      newErrors.password = t('password.requirements');
    }
    if (phoneOrEmail && lowerPassword.includes(phoneOrEmail.toLowerCase().split('@')[0])) {
      newErrors.password = t('password.requirements');
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowOtpScreen(true);
      setResendTimer(30);
      setCanResend(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }

      // Auto-submit on full entry
      if (index === 5 && value && newOtp.every(digit => digit)) {
        setTimeout(() => handleVerifyOtp(), 300);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    if (resendAttempts >= 3) {
      alert('Maximum resend attempts reached. Please try again later.');
      return;
    }
    setResendAttempts(resendAttempts + 1);
    setResendTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    otpInputRefs.current[0]?.focus();
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      if (mode === 'signup') {
        context?.navigateTo('profile-completion');
      } else {
        context?.setIsVerified(true);
        context?.navigateTo('home');
      }
    }
  };

  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-amber-500',
    strong: 'bg-green-500',
  };

  const strengthText = {
    weak: t('password.weak'),
    medium: t('password.medium'),
    strong: t('password.strong'),
  };

  if (showOtpScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-gray-100 px-6 py-12">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => setShowOtpScreen(false)}
            className="mb-8 flex items-center gap-2 text-teal-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('auth.back')}</span>
          </button>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-teal-900 mb-2">{t('auth.verifyOtp')}</h2>
            <p className="text-gray-600 mb-8">
              {t('auth.otpSentTo')} {inputMethod === 'phone' ? t('auth.yourPhone') : t('auth.yourEmail')}
            </p>

            {/* OTP Input Boxes */}
            <div className="flex gap-3 mb-8 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-14 h-16 text-center border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:outline-none text-xl"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otp.join('').length !== 6}
              className={`w-full py-4 rounded-xl transition-all ${
                otp.join('').length === 6
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('auth.verifyOtp')}
            </button>

            <button
              onClick={handleResendOtp}
              disabled={!canResend || resendAttempts >= 3}
              className={`w-full mt-4 py-3 rounded-xl transition-all ${
                canResend && resendAttempts < 3
                  ? 'text-teal-600 hover:bg-teal-50'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              {!canResend ? `${t('auth.resendIn')} ${resendTimer} ${t('auth.seconds')}` : t('auth.resendOtp')}
              {resendAttempts > 0 && ` (${resendAttempts}/3)`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-gray-100 px-6 py-12">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => context?.navigateTo('auth-choice')}
          className="mb-8 flex items-center gap-2 text-teal-600 hover:text-teal-700"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{t('auth.back')}</span>
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-teal-900 mb-2">
            {mode === 'login' ? t('auth.login') : t('auth.signup')}
          </h2>
          <p className="text-gray-600 mb-8">
            {mode === 'login' ? t('auth.enterCredentials') : t('auth.createAccount')}
          </p>

          {/* Input Method Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setInputMethod('phone')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                inputMethod === 'phone'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Phone className="w-5 h-5" />
              <span>{t('auth.phone')}</span>
            </button>
            <button
              onClick={() => setInputMethod('email')}
              className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                inputMethod === 'email'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>{t('auth.email')}</span>
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-5 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">
                {inputMethod === 'phone' ? t('auth.phoneNumber') : t('auth.emailAddress')}
              </label>
              <input
                type={inputMethod === 'phone' ? 'tel' : 'email'}
                value={phoneOrEmail}
                onChange={(e) => {
                  setPhoneOrEmail(e.target.value);
                  setErrors({ ...errors, phoneOrEmail: '' });
                }}
                placeholder={inputMethod === 'phone' ? '9876543210' : 'your@email.com'}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.phoneOrEmail ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                }`}
              />
              {errors.phoneOrEmail && (
                <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.phoneOrEmail}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    setErrors({ ...errors, password: '' });
                  }}
                  placeholder={t('auth.enterPassword')}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none transition-colors pr-12 ${
                    errors.password ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Strength:</span>
                    <span className={`text-sm ${
                      getPasswordStrength() === 'weak' ? 'text-red-600' :
                      getPasswordStrength() === 'medium' ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {strengthText[getPasswordStrength()]}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${strengthColor[getPasswordStrength()]}`}
                      style={{
                        width: getPasswordStrength() === 'weak' ? '33%' :
                               getPasswordStrength() === 'medium' ? '66%' : '100%'
                      }}
                    />
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-red-600 mt-2 text-sm flex items-center gap-1">
                  <X className="w-4 h-4" />
                  {errors.password}
                </p>
              )}

              {/* Password Requirements */}
              <div className="mt-4 space-y-2">
                <PasswordRequirement met={passwordValidation.minLength} text={t('password.minLength')} />
                <PasswordRequirement met={passwordValidation.maxLength} text={t('password.maxLength')} />
                <PasswordRequirement met={passwordValidation.uppercase} text={t('password.uppercase')} />
                <PasswordRequirement met={passwordValidation.lowercase} text={t('password.lowercase')} />
                <PasswordRequirement met={passwordValidation.number} text={t('password.number')} />
                <PasswordRequirement met={passwordValidation.special} text={t('password.special')} />
                <PasswordRequirement met={passwordValidation.noSpaces} text={t('password.noSpaces')} />
              </div>
            </div>
          </div>

          <button
            onClick={handleSendOtp}
            disabled={!phoneOrEmail || !password}
            className={`w-full py-4 rounded-xl transition-all ${
              phoneOrEmail && password
                ? 'bg-teal-600 text-white hover:bg-teal-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('auth.sendOtp')}
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );
}