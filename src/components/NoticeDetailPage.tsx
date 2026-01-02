import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { ArrowLeft, FileText, Calendar, User, Download, Eye } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Property Tax Payment Deadline Extended',
    category: 'Tax Notice',
    date: 'December 28, 2025',
    postedBy: 'Revenue Department',
    summary: 'Last date for property tax payment extended to January 31, 2026.',
    fullContent: `The Municipality announces that the last date for property tax payment for the financial year 2025-26 has been extended to January 31, 2026.

Key Points:
• Original deadline: December 31, 2025
• Extended deadline: January 31, 2026
• No penalty for payments before January 31, 2026
• Online payment available on municipality website
• Physical payment counters open Mon-Sat, 9 AM - 5 PM

Payment Methods:
1. Online: Visit www.municipality.gov.in/tax
2. Mobile App: MyArea app payment section
3. Bank Transfer: Use municipality account details
4. In-person: Visit any municipality office

For queries, contact:
Revenue Department: 1800-123-4569
Email: revenue@municipality.gov.in`,
    pdfUrl: '/documents/tax-notice-2025.pdf',
  },
  {
    id: 2,
    title: 'Road Maintenance Schedule - January 2026',
    category: 'Infrastructure',
    date: 'December 30, 2025',
    postedBy: 'Public Works Department',
    summary: 'Scheduled road repairs across multiple sectors in January 2026.',
    fullContent: `The Public Works Department will conduct road maintenance and repairs in the following sectors during January 2026.

Schedule:
• Sector A: January 5-10, 2026
• Sector B: January 12-17, 2026
• Sector C: January 19-24, 2026
• Sector D: January 26-31, 2026

Work Timings:
• Monday to Saturday: 9 AM - 6 PM
• Sunday: No work
• Emergency repairs: As needed

Impact:
• Temporary traffic diversions
• Minor delays expected
• Parking restrictions in work zones
• Dust control measures in place

Alternative Routes:
Detailed diversion maps are available at municipality office and on the MyArea app.

We apologize for any inconvenience and appreciate your cooperation.`,
    pdfUrl: '/documents/road-schedule-jan-2026.pdf',
  },
  {
    id: 3,
    title: 'Community Health Camp - Free Check-ups',
    category: 'Health',
    date: 'January 2, 2026',
    postedBy: 'Health & Welfare Department',
    summary: 'Free health check-up camp on January 15, 2026.',
    fullContent: `The Health & Welfare Department is organizing a free community health camp.

Date: January 15, 2026
Time: 8 AM - 2 PM
Venue: Community Center, Ward 12

Services Offered:
• General health check-up
• Blood pressure monitoring
• Blood sugar testing
• BMI calculation
• Doctor consultation
• Medicine distribution (basic)
• Health education sessions

Who Can Attend:
• All residents of Ward 12
• Bring your MyArea ID or proof of residence
• Children and elderly especially encouraged
• No appointment needed

What to Bring:
• Identity proof
• MyArea app (for records)
• Any existing medical prescriptions

Special Focus:
This camp will have special focus on elderly citizens and children. Free basic medicines will be provided.

For more information:
Health Department: 1800-123-4570`,
    pdfUrl: '/documents/health-camp-2026.pdf',
  },
];

interface NoticeDetailPageProps {
  noticeId: number | null;
}

export default function NoticeDetailPage({ noticeId }: NoticeDetailPageProps) {
  const context = useContext(AppContext);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const notice = notices.find(n => n.id === noticeId);

  if (!notice) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Notice not found</p>
          <button
            onClick={() => context?.navigateTo('notices')}
            className="text-teal-600 hover:text-teal-700"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleViewPdf = () => {
    setShowPdfViewer(true);
  };

  const handleDownload = () => {
    alert('PDF download started: ' + notice.title);
  };

  if (showPdfViewer) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20">
        {/* Header */}
        <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPdfViewer(false)}
              className="p-2 hover:bg-teal-700 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1>PDF Viewer</h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* PDF Viewer Placeholder */}
            <div className="w-full h-[800px] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-gray-900 mb-2">PDF Document</h3>
                <p className="text-gray-600 mb-6">{notice.title}</p>
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 flex items-center gap-2 mx-auto"
                >
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-teal-600 text-white px-6 py-6 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => context?.navigateTo('notices')}
            className="p-2 hover:bg-teal-700 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Notice Details</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {/* Notice Header */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm mb-4">
              {notice.category}
            </span>
            <h2 className="text-teal-900 mb-4">{notice.title}</h2>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-teal-600" />
                <span>{notice.date}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <User className="w-5 h-5 text-teal-600" />
                <span>Posted by: {notice.postedBy}</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 bg-teal-50 border border-teal-200 rounded-xl p-4">
            <p className="text-teal-900">{notice.summary}</p>
          </div>

          {/* Full Content */}
          <div className="mb-8">
            <h3 className="text-gray-900 mb-4">Full Notice</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {notice.fullContent}
            </div>
          </div>

          {/* PDF Actions */}
          <div className="space-y-3">
            <button
              onClick={handleViewPdf}
              className="w-full py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" />
              <span>View PDF Document</span>
            </button>
            
            <button
              onClick={handleDownload}
              className="w-full py-4 bg-white border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              For more information, contact {notice.postedBy} at your local municipality office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
