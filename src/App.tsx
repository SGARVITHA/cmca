import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSelection from './components/LanguageSelection';
import AuthChoice from './components/AuthChoice';
import AuthPage from './components/AuthPage';
import ProfileCompletion from './components/ProfileCompletion';
import VerificationStatus from './components/VerificationStatus';
import HomePage from './components/HomePage';
import NoticesPage from './components/NoticesPage';
import HelpVolunteerPage from './components/HelpVolunteerPage';
import ServicesPage from './components/ServicesPage';
import SafetyPage from './components/SafetyPage';
import PollsPage from './components/PollsPage';
import ProfilePage from './components/ProfilePage';
import EventDetailPage from './components/EventDetailPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import AlertDetailPage from './components/AlertDetailPage';
import NoticeDetailPage from './components/NoticeDetailPage';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import HelpSupportPage from './components/HelpSupportPage';
import NeedHelpPage from './components/NeedHelpPage';
import OfferHelpPage from './components/OfferHelpPage';

export type Language = 'en' | 'ta' | 'hi';
export type Screen = 
  | 'language'
  | 'auth-choice'
  | 'login'
  | 'signup'
  | 'profile-completion'
  | 'verification-pending'
  | 'verification-complete'
  | 'home'
  | 'notices'
  | 'notice-detail'
  | 'help-volunteer'
  | 'need-help'
  | 'offer-help'
  | 'services'
  | 'service-detail'
  | 'safety'
  | 'alert-detail'
  | 'polls'
  | 'profile'
  | 'event-detail'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'help-support';

export interface UserProfile {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  address: {
    houseNo: string;
    street: string;
    area: string;
    ward: string;
    city: string;
    pincode: string;
  };
  volunteerInterest: boolean;
  volunteerAreas: string[];
  emergencyContacts: Array<{
    name: string;
    relation: string;
    phone: string;
  }>;
  servicesProvided: boolean;
  serviceDetails?: {
    type: string;
    businessName: string;
    phone: string;
    serviceArea: string;
    description: string;
  };
}

export interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentScreen: Screen;
  navigateTo: (screen: Screen, params?: any) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  isVerified: boolean;
  setIsVerified: (verified: boolean) => void;
  setSelectedEvent?: (event: any) => void;
  selectedEvent?: any;
}

export const AppContext = React.createContext<AppContextType | null>(null);

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);
  const [selectedNoticeId, setSelectedNoticeId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const navigateTo = (screen: Screen, params?: any) => {
    if (params?.eventId) setSelectedEventId(params.eventId);
    if (params?.serviceId) setSelectedServiceId(params.serviceId);
    if (params?.alertId) setSelectedAlertId(params.alertId);
    if (params?.noticeId) setSelectedNoticeId(params.noticeId);
    setCurrentScreen(screen);
  };

  const contextValue: AppContextType = {
    language,
    setLanguage,
    currentScreen,
    navigateTo,
    userProfile,
    setUserProfile,
    isVerified,
    setIsVerified,
    setSelectedEvent: (event) => {
      setSelectedEvent(event);
      navigateTo('event-detail');
    },
    selectedEvent,
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'language':
        return <LanguageSelection />;
      case 'auth-choice':
        return <AuthChoice />;
      case 'login':
        return <AuthPage mode="login" />;
      case 'signup':
        return <AuthPage mode="signup" />;
      case 'profile-completion':
        return <ProfileCompletion />;
      case 'verification-pending':
        return <VerificationStatus status="pending" />;
      case 'verification-complete':
        return <VerificationStatus status="verified" />;
      case 'home':
        return <HomePage />;
      case 'notices':
        return <NoticesPage />;
      case 'notice-detail':
        return <NoticeDetailPage noticeId={selectedNoticeId} />;
      case 'help-volunteer':
        return <HelpVolunteerPage />;
      case 'need-help':
        return <NeedHelpPage />;
      case 'offer-help':
        return <OfferHelpPage />;
      case 'services':
        return <ServicesPage />;
      case 'service-detail':
        return <ServiceDetailPage serviceId={selectedServiceId} />;
      case 'safety':
        return <SafetyPage />;
      case 'alert-detail':
        return <AlertDetailPage alertId={selectedAlertId} />;
      case 'polls':
        return <PollsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'event-detail':
        return <EventDetailPage eventId={selectedEventId} />;
      case 'about':
        return <AboutPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'help-support':
        return <HelpSupportPage />;
      default:
        return <LanguageSelection />;
    }
  };

  return (
    <LanguageProvider>
      <AppContext.Provider value={contextValue}>
        <div className="min-h-screen bg-slate-50">
          {renderScreen()}
        </div>
      </AppContext.Provider>
    </LanguageProvider>
  );
}