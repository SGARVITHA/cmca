import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, Phone, MapPin, Clock, User, Star } from 'lucide-react';

const services = [
  {
    id: 1,
    category: 'Plumber',
    businessName: 'Quick Fix Plumbing',
    ownerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Ward 12, Sector A',
    description: '24/7 emergency plumbing services. Specializing in pipe repairs, installations, and water tank maintenance.',
    fullDescription: 'Quick Fix Plumbing has been serving the community for over 10 years. We handle all types of plumbing work including emergency repairs, new installations, bathroom fitting, water heater service, and drainage cleaning. Our technicians are trained and experienced.',
    workingHours: 'Mon-Sun: 24/7 Emergency Service',
    regularHours: 'Regular Service: 8 AM - 8 PM',
    distance: '0.5 km',
    rating: 4.5,
    reviews: 120,
    services: ['Emergency Repairs', 'Pipe Installation', 'Bathroom Fitting', 'Water Tank Cleaning', 'Drainage Solutions'],
  },
  {
    id: 2,
    category: 'Plumber',
    businessName: 'Reliable Plumbers',
    ownerName: 'Amit Sharma',
    phone: '+91 98765 43211',
    location: 'Ward 12, Sector B',
    description: 'Professional plumbing services for residential and commercial properties.',
    fullDescription: 'Reliable Plumbers offers comprehensive plumbing solutions with a focus on quality and customer satisfaction. We use modern equipment and techniques to ensure long-lasting repairs.',
    workingHours: 'Mon-Sat: 9 AM - 7 PM',
    regularHours: 'Sunday: Closed',
    distance: '1.2 km',
    rating: 4.2,
    reviews: 85,
    services: ['Leak Repairs', 'Pipe Installation', 'Fixture Installation', 'Water Heater Service'],
  },
  {
    id: 3,
    category: 'Electrician',
    businessName: 'Bright Spark Electricals',
    ownerName: 'Suresh Reddy',
    phone: '+91 98765 43212',
    location: 'Ward 12, Sector A',
    description: 'Licensed electricians for all electrical work. Wiring, repairs, and installations.',
    fullDescription: 'Bright Spark Electricals is a licensed electrical service provider with certified electricians. We handle residential and commercial electrical work with a focus on safety and compliance.',
    workingHours: 'Mon-Sat: 8 AM - 9 PM',
    regularHours: 'Sunday: Emergency Only',
    distance: '0.8 km',
    rating: 4.7,
    reviews: 150,
    services: ['House Wiring', 'Electrical Repairs', 'Appliance Installation', 'Safety Inspection', 'LED Installation'],
  },
];

interface ServiceDetailPageProps {
  serviceId: number | null;
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const context = useContext(AppContext);

  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Service not found</p>
          <button
            onClick={() => context?.navigateTo('services')}
            className="text-teal-600 hover:text-teal-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleCall = () => {
    window.location.href = `tel:${service.phone}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => context?.navigateTo('services')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Service Details</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-teal-900 mb-2">{service.businessName}</h2>
                <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  {service.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span>{service.rating}</span>
                <span className="text-gray-500 text-sm">({service.reviews})</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p>{service.ownerName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{service.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p>{service.location} ({service.distance} away)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Clock className="w-5 h-5 text-teal-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Working Hours</p>
                <p>{service.workingHours}</p>
                <p className="text-sm text-gray-600">{service.regularHours}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{service.fullDescription}</p>
          </div>

          {/* Services Offered */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-3">Services Offered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.services.map((svc, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <span className="text-teal-600">✓</span>
                  <span>{svc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call Button */}
          <button
            onClick={handleCall}
            className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-900">
              <strong>Note:</strong> Service providers are community-listed. Please verify credentials and discuss pricing before engaging services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
