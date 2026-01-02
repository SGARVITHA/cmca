import React, { useContext, useState } from 'react';
import { AppContext, UserProfile } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { Plus, X } from 'lucide-react';

const volunteerOptions = [
  'Emergency response',
  'Event volunteering',
  'Cleanliness drives',
  'Elder support',
  'Other',
];

const serviceTypes = [
  'Plumber',
  'Electrician',
  'Tutor',
  'Doctor',
  'Carpenter',
  'Painter',
  'Other',
];

const relationOptions = [
  'Parent',
  'Spouse',
  'Sibling',
  'Child',
  'Friend',
  'Neighbor',
  'Other',
];

export default function ProfileCompletion() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [ward, setWard] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [volunteerInterest, setVolunteerInterest] = useState<boolean | null>(null);
  const [volunteerAreas, setVolunteerAreas] = useState<string[]>([]);
  
  const [emergencyContacts, setEmergencyContacts] = useState<Array<{
    name: string;
    relation: string;
    phone: string;
  }>>([]);
  
  const [servicesProvided, setServicesProvided] = useState<boolean | null>(null);
  const [serviceType, setServiceType] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateName = (name: string): string | null => {
    if (!name) return 'This field is required';
    if (name.length < 2) return 'Minimum 2 characters required';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Only alphabetic characters allowed';
    return null;
  };

  const validateAge = (ageValue: string): string | null => {
    if (!ageValue) return 'Age is required';
    const ageNum = parseInt(ageValue);
    if (isNaN(ageNum)) return 'Age must be a number';
    if (ageNum < 18 || ageNum > 100) return 'Age must be between 18 and 100';
    return null;
  };

  const validatePincode = (pin: string): string | null => {
    if (!pin) return 'Pincode is required';
    if (!/^\d{6}$/.test(pin)) return 'Pincode must be exactly 6 digits';
    return null;
  };

  const validateEmergencyPhone = (phone: string): string | null => {
    if (!phone) return 'Phone number is required';
    if (!/^\d{10}$/.test(phone)) return 'Phone number must be 10 digits';
    // Check if same as user phone (would need to be passed from context)
    return null;
  };

  const validateBusinessName = (name: string): string | null => {
    if (!name) return 'Business name is required';
    if (name.length < 3) return 'Minimum 3 characters required';
    return null;
  };

  const validateServiceDescription = (desc: string): string | null => {
    if (desc.length > 250) return 'Maximum 250 characters allowed';
    return null;
  };

  const handleVolunteerAreaToggle = (area: string) => {
    if (volunteerAreas.includes(area)) {
      setVolunteerAreas(volunteerAreas.filter(a => a !== area));
    } else {
      setVolunteerAreas([...volunteerAreas, area]);
    }
  };

  const handleAddEmergencyContact = () => {
    setEmergencyContacts([...emergencyContacts, { name: '', relation: '', phone: '' }]);
  };

  const handleRemoveEmergencyContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    const newContacts = [...emergencyContacts];
    newContacts[index] = { ...newContacts[index], [field]: value };
    setEmergencyContacts(newContacts);
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate all fields
    const firstNameError = validateName(firstName);
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateName(lastName);
    if (lastNameError) newErrors.lastName = lastNameError;

    const ageError = validateAge(age);
    if (ageError) newErrors.age = ageError;

    if (!houseNo) newErrors.houseNo = 'House/Flat number is required';
    if (!street) newErrors.street = 'Street is required';
    if (!area) newErrors.area = 'Area is required';
    if (!ward) newErrors.ward = 'Ward/Sector is required';
    if (!city) newErrors.city = 'City is required';

    const pincodeError = validatePincode(pincode);
    if (pincodeError) newErrors.pincode = pincodeError;

    // Validate emergency contacts (minimum 1 required)
    const validContacts = emergencyContacts.filter(c => c.name && c.phone && c.relation);
    if (validContacts.length === 0) {
      newErrors.emergencyContacts = 'At least one emergency contact is required';
    } else {
      // Validate each contact
      emergencyContacts.forEach((contact, index) => {
        if (contact.name || contact.phone || contact.relation) {
          const nameError = validateName(contact.name);
          if (nameError) newErrors[`contact_${index}_name`] = nameError;
          
          const phoneError = validateEmergencyPhone(contact.phone);
          if (phoneError) newErrors[`contact_${index}_phone`] = phoneError;

          if (!contact.relation) newErrors[`contact_${index}_relation`] = 'Relation is required';
        }
      });
    }

    // Validate service details if provided
    if (servicesProvided) {
      if (!serviceType) newErrors.serviceType = 'Service type is required';
      
      const businessError = validateBusinessName(businessName);
      if (businessError) newErrors.businessName = businessError;

      if (!servicePhone) newErrors.servicePhone = 'Phone number is required';
      else if (!/^\d{10}$/.test(servicePhone)) newErrors.servicePhone = 'Phone must be 10 digits';

      const descError = validateServiceDescription(serviceDescription);
      if (descError) newErrors.serviceDescription = descError;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const profile: UserProfile = {
        firstName,
        lastName,
        age,
        gender,
        address: {
          houseNo,
          street,
          area,
          ward,
          city,
          pincode,
        },
        volunteerInterest: volunteerInterest || false,
        volunteerAreas,
        emergencyContacts: validContacts,
        servicesProvided: servicesProvided || false,
        serviceDetails: servicesProvided ? {
          type: serviceType,
          businessName,
          phone: servicePhone,
          serviceArea,
          description: serviceDescription,
        } : undefined,
      };

      context?.setUserProfile(profile);
      context?.navigateTo('verification-pending');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-teal-600 text-white px-6 py-6">
        <h1 className="mb-2">{t('profile.complete')}</h1>
        <p className="text-teal-100">
          {t('profile.helpServe')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-teal-900 mb-6">{t('profile.basicInfo')}</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.firstName')} *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors({ ...errors, firstName: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.lastName')} *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors({ ...errors, lastName: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.age')} * (18-100)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setErrors({ ...errors, age: '' });
                  }}
                  min="18"
                  max="100"
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.age ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.genderOptional')}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:outline-none bg-white"
                >
                  <option value="">{t('profile.selectGender')}</option>
                  <option value="male">{t('profile.male')}</option>
                  <option value="female">{t('profile.female')}</option>
                  <option value="other">{t('profile.other')}</option>
                  <option value="prefer-not-to-say">{t('profile.preferNotToSay')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-teal-900 mb-6">{t('profile.address')}</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.houseFlatNo')} *</label>
                <input
                  type="text"
                  value={houseNo}
                  onChange={(e) => {
                    setHouseNo(e.target.value);
                    setErrors({ ...errors, houseNo: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.houseNo ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.houseNo && <p className="text-red-600 text-sm mt-1">{errors.houseNo}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.street')} *</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => {
                    setStreet(e.target.value);
                    setErrors({ ...errors, street: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.street ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.street && <p className="text-red-600 text-sm mt-1">{errors.street}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('profile.area')} *</label>
              <input
                type="text"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                  setErrors({ ...errors, area: '' });
                }}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                  errors.area ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                }`}
              />
              {errors.area && <p className="text-red-600 text-sm mt-1">{errors.area}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.wardSector')} *</label>
                <input
                  type="text"
                  value={ward}
                  onChange={(e) => {
                    setWard(e.target.value);
                    setErrors({ ...errors, ward: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.ward ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.ward && <p className="text-red-600 text-sm mt-1">{errors.ward}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.city')} *</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setErrors({ ...errors, city: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.city ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">{t('profile.pincode')} * (6 digits)</label>
              <input
                type="text"
                value={pincode}
                maxLength={6}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setPincode(value);
                  setErrors({ ...errors, pincode: '' });
                }}
                className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                }`}
              />
              {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </div>

        {/* Volunteer Interest */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-teal-900 mb-4">{t('profile.volunteerInterest')}</h2>
          <p className="text-gray-600 mb-4">
            {t('profile.willingToVolunteer')}
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setVolunteerInterest(true)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                volunteerInterest === true
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-300 text-gray-700 hover:border-teal-300'
              }`}
            >
              {t('profile.yes')}
            </button>
            <button
              onClick={() => setVolunteerInterest(false)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                volunteerInterest === false
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-300 text-gray-700 hover:border-teal-300'
              }`}
            >
              {t('profile.no')}
            </button>
          </div>

          {volunteerInterest && (
            <div>
              <p className="text-gray-700 mb-3">{t('profile.areasOfInterest')}</p>
              <div className="space-y-2">
                {volunteerOptions.map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={volunteerAreas.includes(option)}
                      onChange={() => handleVolunteerAreaToggle(option)}
                      className="w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-teal-900">{t('profile.emergencyContacts')} *</h2>
            <button
              onClick={handleAddEmergencyContact}
              className="flex items-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700"
            >
              <Plus className="w-5 h-5" />
              <span>{t('profile.addContact')}</span>
            </button>
          </div>

          {errors.emergencyContacts && (
            <p className="text-red-600 mb-4">{errors.emergencyContacts}</p>
          )}

          {emergencyContacts.length === 0 && (
            <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-xl">
              {t('profile.noContactsYet')}
            </p>
          )}

          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-xl relative">
                <button
                  onClick={() => handleRemoveEmergencyContact(index)}
                  className="absolute top-2 right-2 p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-3 pr-8">
                  <div>
                    <input
                      type="text"
                      placeholder={t('profile.name')}
                      value={contact.name}
                      onChange={(e) => {
                        handleEmergencyContactChange(index, 'name', e.target.value);
                        setErrors({ ...errors, [`contact_${index}_name`]: '' });
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                        errors[`contact_${index}_name`] ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                      }`}
                    />
                    {errors[`contact_${index}_name`] && (
                      <p className="text-red-600 text-sm mt-1">{errors[`contact_${index}_name`]}</p>
                    )}
                  </div>

                  <div>
                    <select
                      value={contact.relation}
                      onChange={(e) => {
                        handleEmergencyContactChange(index, 'relation', e.target.value);
                        setErrors({ ...errors, [`contact_${index}_relation`]: '' });
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none bg-white ${
                        errors[`contact_${index}_relation`] ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                      }`}
                    >
                      <option value="">{t('profile.relation')}</option>
                      {relationOptions.map(rel => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                    {errors[`contact_${index}_relation`] && (
                      <p className="text-red-600 text-sm mt-1">{errors[`contact_${index}_relation`]}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder={t('auth.phoneNumber')}
                      value={contact.phone}
                      maxLength={10}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        handleEmergencyContactChange(index, 'phone', value);
                        setErrors({ ...errors, [`contact_${index}_phone`]: '' });
                      }}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none ${
                        errors[`contact_${index}_phone`] ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                      }`}
                    />
                    {errors[`contact_${index}_phone`] && (
                      <p className="text-red-600 text-sm mt-1">{errors[`contact_${index}_phone`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Provided */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-teal-900 mb-4">{t('profile.servicesProvided')}</h2>
          <p className="text-gray-600 mb-4">
            {t('profile.provideServices')}
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setServicesProvided(true)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                servicesProvided === true
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-300 text-gray-700 hover:border-teal-300'
              }`}
            >
              {t('profile.yes')}
            </button>
            <button
              onClick={() => setServicesProvided(false)}
              className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all ${
                servicesProvided === false
                  ? 'border-teal-600 bg-teal-50 text-teal-700'
                  : 'border-gray-300 text-gray-700 hover:border-teal-300'
              }`}
            >
              {t('profile.no')}
            </button>
          </div>

          {servicesProvided && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('profile.serviceType')} *</label>
                <select
                  value={serviceType}
                  onChange={(e) => {
                    setServiceType(e.target.value);
                    setErrors({ ...errors, serviceType: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none bg-white ${
                    errors.serviceType ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                >
                  <option value="">{t('profile.selectServiceType')}</option>
                  {serviceTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-red-600 text-sm mt-1">{errors.serviceType}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('profile.businessName')} * (min 3 chars)</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    setErrors({ ...errors, businessName: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.businessName ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.businessName && <p className="text-red-600 text-sm mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('profile.workPhone')} *</label>
                <input
                  type="tel"
                  value={servicePhone}
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setServicePhone(value);
                    setErrors({ ...errors, servicePhone: '' });
                  }}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none ${
                    errors.servicePhone ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                {errors.servicePhone && <p className="text-red-600 text-sm mt-1">{errors.servicePhone}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('profile.serviceArea')}</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:border-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">{t('profile.description')} (max 250 chars)</label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => {
                    setServiceDescription(e.target.value);
                    setErrors({ ...errors, serviceDescription: '' });
                  }}
                  maxLength={250}
                  rows={3}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none resize-none ${
                    errors.serviceDescription ? 'border-red-500' : 'border-gray-300 focus:border-teal-600'
                  }`}
                />
                <p className="text-sm text-gray-500 mt-1 text-right">{serviceDescription.length}/250</p>
                {errors.serviceDescription && <p className="text-red-600 text-sm mt-1">{errors.serviceDescription}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-5 bg-teal-600 text-white rounded-2xl hover:bg-teal-700 transition-all shadow-md"
        >
          {t('profile.submitProfile')}
        </button>
      </div>
    </div>
  );
}
