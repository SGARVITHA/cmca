import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Check, Clock, CheckCircle2 } from 'lucide-react';

interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: number[];
  hasVoted: boolean;
  userVote: number | null;
  createdBy: string;
  date: string;
  status: 'active' | 'expired';
  decision?: string;
  expiryDate?: string;
}

export default function PollsPage() {
  const context = useContext(AppContext);
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active');
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      question: 'What time should the weekly community market be held?',
      options: ['Saturday Morning', 'Saturday Evening', 'Sunday Morning', 'Sunday Evening'],
      votes: [45, 23, 67, 15],
      hasVoted: false,
      userVote: null,
      createdBy: 'Municipality',
      date: 'January 1, 2026',
      status: 'active',
      expiryDate: 'January 15, 2026',
    },
    {
      id: 2,
      question: 'Which community improvement project should be prioritized?',
      options: ['New Park', 'Community Center Renovation', 'Street Lighting', 'Public Library'],
      votes: [32, 28, 54, 36],
      hasVoted: false,
      userVote: null,
      createdBy: 'Community Admin',
      date: 'December 28, 2025',
      status: 'active',
      expiryDate: 'January 10, 2026',
    },
    {
      id: 3,
      question: 'Should the community organize a monthly clean-up drive?',
      options: ['Yes, first Saturday', 'Yes, last Saturday', 'Yes, first Sunday', 'No'],
      votes: [78, 45, 23, 4],
      hasVoted: true,
      userVote: 0,
      createdBy: 'Municipality',
      date: 'December 25, 2025',
      status: 'expired',
      decision: 'Decision: Monthly clean-up drives will be held on first Saturday',
    },
    {
      id: 4,
      question: 'Should parking fees be increased in the commercial area?',
      options: ['Yes, increase by 20%', 'Yes, increase by 10%', 'No, keep current rates', 'No, decrease rates'],
      votes: [15, 28, 89, 12],
      hasVoted: true,
      userVote: 2,
      createdBy: 'Municipality',
      date: 'December 20, 2025',
      status: 'expired',
      decision: 'Decision: Parking fees will remain at current rates',
    },
    {
      id: 5,
      question: 'What type of recreational facility should be added to Ward 12?',
      options: ['Children\'s Playground', 'Outdoor Gym', 'Basketball Court', 'Meditation Garden'],
      votes: [102, 67, 45, 34],
      hasVoted: true,
      userVote: 0,
      createdBy: 'Ward Committee',
      date: 'December 15, 2025',
      status: 'expired',
      decision: 'Decision: Children\'s Playground will be constructed in Q2 2026',
    },
  ]);

  const handleVote = (pollId: number, optionIndex: number) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId && !poll.hasVoted && poll.status === 'active') {
        const newVotes = [...poll.votes];
        newVotes[optionIndex] += 1;
        return {
          ...poll,
          votes: newVotes,
          hasVoted: true,
          userVote: optionIndex,
        };
      }
      return poll;
    }));
  };

  const getTotalVotes = (votes: number[]) => {
    return votes.reduce((sum, vote) => sum + vote, 0);
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const activePolls = polls.filter(p => p.status === 'active');
  const expiredPolls = polls.filter(p => p.status === 'expired');
  const currentPolls = activeTab === 'active' ? activePolls : expiredPolls;

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
          <h1>{t('polls.title')}</h1>
        </div>
        <p className="text-teal-100 ml-14">
          {t('polls.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[104px] z-10">
        <div className="max-w-4xl mx-auto flex">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 border-b-2 transition-colors ${
              activeTab === 'active'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t('polls.active')} ({activePolls.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('expired')}
            className={`flex-1 py-4 border-b-2 transition-colors ${
              activeTab === 'expired'
                ? 'border-teal-600 text-teal-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('polls.expired')} ({expiredPolls.length})</span>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="space-y-6">
          {currentPolls.map((poll) => {
            const totalVotes = getTotalVotes(poll.votes);

            return (
              <div key={poll.id} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 flex-1">{poll.question}</h3>
                    {poll.status === 'expired' && (
                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                        {t('polls.closed')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{poll.createdBy}</span>
                    <span>•</span>
                    <span>{poll.date}</span>
                    {poll.status === 'active' && poll.expiryDate && (
                      <>
                        <span>•</span>
                        <span className="text-teal-600">{t('polls.expiresOn')} {poll.expiryDate}</span>
                      </>
                    )}
                  </div>
                </div>

                {poll.hasVoted || poll.status === 'expired' ? (
                  <div className="space-y-3">
                    {poll.options.map((option, index) => {
                      const percentage = getPercentage(poll.votes[index], totalVotes);
                      const isUserVote = poll.userVote === index;
                      const isWinning = poll.votes[index] === Math.max(...poll.votes);

                      return (
                        <div key={index} className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className={`${isUserVote ? 'text-teal-900' : 'text-gray-700'}`}>
                                {option}
                              </span>
                              {isUserVote && (
                                <Check className="w-4 h-4 text-teal-600" />
                              )}
                              {isWinning && poll.status === 'expired' && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                                  {t('polls.winner')}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-600">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isUserVote ? 'bg-teal-600' : 'bg-gray-400'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        {t('polls.totalVotes')} {totalVotes}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-3">{t('polls.clickToVote')}</p>
                    {poll.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleVote(poll.id, index)}
                        className="w-full px-4 py-3 text-left border-2 border-gray-300 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Decision for expired polls */}
                {poll.status === 'expired' && poll.decision && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        <p className="text-green-900">{poll.decision}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {currentPolls.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {activeTab === 'active' ? t('polls.noActivePolls') : t('polls.noExpiredPolls')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
