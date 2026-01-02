import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How long does verification take?',
    answer: 'Usually 1–2 business days. The municipality team reviews all applications to ensure community safety. You will receive a notification once your account is verified.',
  },
  {
    id: 2,
    question: 'Who can see my information?',
    answer: 'Only municipality administrators and relevant community members during emergencies can access your information. Your emergency contacts are notified only when you trigger an SOS alert.',
  },
  {
    id: 3,
    question: 'Can I change my language later?',
    answer: 'Yes, from Profile → Settings → Change Language. You can switch between English, Tamil, and Hindi at any time.',
  },
  {
    id: 4,
    question: 'What happens if I press SOS by mistake?',
    answer: 'You will be asked to confirm before sending the alert. If you accidentally send an alert, please call your local municipality office immediately to inform them.',
  },
  {
    id: 5,
    question: 'Are service providers verified?',
    answer: 'Services are community-listed and subject to moderation. While we review listings, we recommend exercising your own judgment and verifying credentials before engaging any service provider.',
  },
  {
    id: 6,
    question: 'How do I update my emergency contacts?',
    answer: 'Go to Profile → Emergency Contacts. You can add, edit, or remove contacts at any time. We recommend keeping this information up to date.',
  },
  {
    id: 7,
    question: 'Can I delete my account?',
    answer: 'Yes, you can request account deletion by contacting your local municipality office. Note that some information may be retained for legal and safety purposes.',
  },
  {
    id: 8,
    question: 'What should I do if I see incorrect information in a notice?',
    answer: 'Report it immediately through the Help & Support section or contact your municipality office directly. Accuracy of official information is our priority.',
  },
  {
    id: 9,
    question: 'How do I participate in volunteer events?',
    answer: 'Go to Help / Volunteer → Events tab. Browse upcoming events and click "Join Event" to register. The organizer will contact you with details.',
  },
  {
    id: 10,
    question: 'Is my data secure?',
    answer: 'Yes, all data is encrypted and protected under applicable data protection laws. We use industry-standard security measures to safeguard your information.',
  },
];

export default function HelpSupportPage() {
  const context = useContext(AppContext);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

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
          <h1>Help & Support</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Contact Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-teal-900 mb-4">Contact Support</h2>
          <p className="text-gray-700 mb-6">
            For immediate assistance or queries not covered in FAQs, please contact your local municipality office.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Helpline</span>
              <a href="tel:18001234567" className="text-teal-600">
                1800-123-4567
              </a>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Email</span>
              <a href="mailto:support@myarea.gov.in" className="text-teal-600">
                support@myarea.gov.in
              </a>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-700">Hours</span>
              <span className="text-gray-900">Mon-Fri, 9 AM - 6 PM</span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-teal-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="border-2 border-gray-200 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 pr-4">{faq.question}</span>
                  {openFaqId === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaqId === faq.id && (
                  <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 mt-8">
          <h3 className="text-teal-900 mb-3">Need More Help?</h3>
          <p className="text-gray-700 mb-4">
            Visit your local municipality office for in-person assistance or detailed guidance on using MyArea.
          </p>
          <button
            onClick={() => context?.navigateTo('about')}
            className="text-teal-600 hover:text-teal-700"
          >
            Learn more about MyArea →
          </button>
        </div>
      </div>
    </div>
  );
}
