import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

const serviceCategories = ['All', 'Plumber', 'Electrician', 'Medical', 'Others'];

const services = [
  {
    id: 1,
    category: 'Plumber',
    businessName: 'Quick Fix Plumbing',
    phone: '+91 98765 43210',
    location: 'Ward 12, Sector A',
    description: '24/7 emergency plumbing services. Specializing in pipe repairs, installations, and water tank maintenance.',
    distance: '0.5 km',
  },
  {
    id: 2,
    category: 'Plumber',
    businessName: 'Reliable Plumbers',
    phone: '+91 98765 43211',
    location: 'Ward 12, Sector B',
    description: 'Professional plumbing services for residential and commercial properties.',
    distance: '1.2 km',
  },
  {
    id: 3,
    category: 'Electrician',
    businessName: 'Bright Spark Electricals',
    phone: '+91 98765 43212',
    location: 'Ward 12, Sector A',
    description: 'Licensed electricians for all electrical work. Wiring, repairs, and installations.',
    distance: '0.8 km',
  },
  {
    id: 4,
    category: 'Electrician',
    businessName: 'Power Solutions',
    phone: '+91 98765 43213',
    location: 'Ward 12, Sector C',
    description: 'Expert electrical services with 10+ years of experience.',
    distance: '1.5 km',
  },
  {
    id: 5,
    category: 'Medical',
    businessName: 'Dr. Sharma Clinic',
    phone: '+91 98765 43214',
    location: 'Ward 12, Main Street',
    description: 'General physician. Consultation hours: 9 AM - 8 PM. Emergency services available.',
    distance: '0.3 km',
  },
  {
    id: 6,
    category: 'Medical',
    businessName: 'City Medical Center',
    phone: '+91 98765 43215',
    location: 'Ward 12, Sector B',
    description: 'Multi-specialty clinic with experienced doctors and modern facilities.',
    distance: '1.0 km',
  },
  {
    id: 7,
    category: 'Others',
    businessName: 'Home Tutor Services',
    phone: '+91 98765 43216',
    location: 'Ward 12, Sector A',
    description: 'Experienced tutors for all subjects, grades 1-12. Home and online classes available.',
    distance: '0.6 km',
  },
  {
    id: 8,
    category: 'Others',
    businessName: 'Quick Carpenter',
    phone: '+91 98765 43217',
    location: 'Ward 12, Sector C',
    description: 'Custom furniture, repairs, and woodwork services.',
    distance: '1.8 km',
  },
];

export default function ServicesPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedServices, setExpandedServices] = useState<Set<number>>(new Set());

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter((service) => service.category === activeCategory);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const toggleServiceDetails = (serviceId: number) => {
    const newExpanded = new Set(expandedServices);
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId);
    } else {
      newExpanded.add(serviceId);
    }
    setExpandedServices(newExpanded);
  };

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
          <h1>{t('services.title')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('services.subtitle')}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[104px] z-10 overflow-x-auto">
        <div className="flex px-6 gap-2">
          {serviceCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`py-4 px-5 border-b-2 transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('services.noServices')}</p>
            </div>
          ) : (
            filteredServices.map((service) => {
              const isExpanded = expandedServices.has(service.id);
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{service.businessName}</h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {service.category}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">{service.distance}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{service.location}</span>
                  </div>

                  {/* Short Description (always visible) */}
                  <p className="text-gray-600 text-sm mb-3">
                    {isExpanded ? service.description : service.description.substring(0, 80) + '...'}
                  </p>

                  {/* More/Less Button */}
                  <button
                    onClick={() => toggleServiceDetails(service.id)}
                    className="text-teal-600 hover:text-teal-700 text-sm mb-3 flex items-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        {t('services.showLess')}
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        {t('services.showMore')}
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Call Button */}
                  <button
                    onClick={() => handleCall(service.phone)}
                    className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{t('services.callNow')}</span>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
