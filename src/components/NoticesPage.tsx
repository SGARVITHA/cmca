import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, FileText, Download, X } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Water Supply Maintenance Schedule',
    category: 'Water',
    categoryColor: 'blue',
    description: 'Scheduled maintenance work will be carried out on the main water supply line. Water supply will be interrupted from 10:00 AM to 2:00 PM on January 5, 2026.',
    date: 'January 2, 2026',
    hasPdf: true,
    source: 'Municipality',
  },
  {
    id: 2,
    title: 'Community Clean-up Drive',
    category: 'Event',
    categoryColor: 'green',
    description: 'Join us for a community clean-up drive on January 10, 2026. All residents are encouraged to participate. Cleaning equipment will be provided.',
    date: 'December 30, 2025',
    hasPdf: false,
    source: 'Community Admin',
  },
  {
    id: 3,
    title: 'Road Repair Work - Main Street',
    category: 'Road',
    categoryColor: 'amber',
    description: 'Main Street will be closed for repair work from January 8-15, 2026. Please use alternate routes during this period.',
    date: 'December 28, 2025',
    hasPdf: true,
    source: 'Municipality',
  },
  {
    id: 4,
    title: 'Property Tax Payment Reminder',
    category: 'Tax',
    categoryColor: 'red',
    description: 'This is a reminder that property tax payments for the year 2026 are due by January 31, 2026. Pay online or visit the municipal office.',
    date: 'December 25, 2025',
    hasPdf: true,
    source: 'Municipality',
  },
  {
    id: 5,
    title: 'New Year Community Celebration',
    category: 'Event',
    categoryColor: 'green',
    description: 'Join your neighbors for a New Year community celebration at the community hall. Food and entertainment will be provided.',
    date: 'December 20, 2025',
    hasPdf: false,
    source: 'Community Admin',
  },
];

export default function NoticesPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<any>(null);

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'amber':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'red':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleViewPdf = (notice: any) => {
    setSelectedNotice(notice);
    setShowPdfViewer(true);
  };

  const handleDownloadPdf = (notice: any) => {
    alert(t('notices.pdfDownloadMsg'));
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
          <h1>{t('notices.title')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('notices.subtitle')}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">{notice.title}</h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs border ${getCategoryColor(
                      notice.categoryColor
                    )}`}
                  >
                    {notice.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-3 leading-relaxed">
                {notice.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-gray-500 text-xs">{notice.source}</p>
                  <p className="text-gray-500 text-xs">{notice.date}</p>
                </div>

                {notice.hasPdf && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewPdf(notice)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all flex items-center gap-2 text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t('notices.viewPdf')}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(notice)}
                      className="p-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-all"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPdfViewer && selectedNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center px-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-gray-900">{selectedNotice.title}</h3>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50">
              <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-teal-600" />
                  </div>
                  <h2 className="text-gray-900 mb-2">{selectedNotice.title}</h2>
                  <p className="text-gray-600 text-sm">{selectedNotice.date}</p>
                </div>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    Official Notice - {selectedNotice.category}
                  </p>
                  
                  <p>{selectedNotice.description}</p>

                  <div className="border-l-4 border-teal-600 pl-4 py-2 bg-teal-50">
                    <p className="text-sm">
                      <strong>{t('notices.importantNote')}:</strong> {t('notices.noteContent')}
                    </p>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm text-gray-900 mb-2">{t('notices.additionalInfo')}:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>{t('notices.info1')}</li>
                      <li>{t('notices.info2')}</li>
                      <li>{t('notices.info3')}</li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-gray-200 text-sm">
                    <p><strong>{t('notices.issuedBy')}:</strong> {selectedNotice.source}</p>
                    <p><strong>{t('notices.issueDate')}:</strong> {selectedNotice.date}</p>
                    <p><strong>{t('notices.reference')}:</strong> MUN/2026/NOT/{selectedNotice.id.toString().padStart(4, '0')}</p>
                  </div>

                  <div className="pt-4 text-center text-xs text-gray-500">
                    <p>{t('notices.officialSeal')}</p>
                    <p className="mt-2">MyArea Municipality</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => handleDownloadPdf(selectedNotice)}
                className="flex-1 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{t('notices.download')}</span>
              </button>
              <button
                onClick={() => setShowPdfViewer(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                {t('notices.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
