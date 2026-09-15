import React from 'react';
import { LayoutDashboard, Users, Award, CreditCard, ChevronRight } from 'lucide-react';
import { MainTabType, RegistrationSubTab, ScoringSubTab, PaymentSubTab } from '../types';

interface NavigationTabsProps {
  currentTab: MainTabType;
  setCurrentTab: (tab: MainTabType) => void;
  regSubTab: RegistrationSubTab;
  setRegSubTab: (sub: RegistrationSubTab) => void;
  scoringSubTab: ScoringSubTab;
  setScoringSubTab: (sub: ScoringSubTab) => void;
  paymentSubTab: PaymentSubTab;
  setPaymentSubTab: (sub: PaymentSubTab) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentTab,
  setCurrentTab,
  regSubTab,
  setRegSubTab,
  scoringSubTab,
  setScoringSubTab,
  paymentSubTab,
  setPaymentSubTab
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      {/* Level 1: Primary Module Navigation */}
      <div className="px-6 flex items-center gap-1 border-b border-slate-100 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
            currentTab === 'overview'
              ? 'border-blue-600 text-blue-600 bg-blue-50/40'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          종합 대시보드 (한눈에 보기)
        </button>

        <button
          onClick={() => setCurrentTab('registration')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
            currentTab === 'registration'
              ? 'border-blue-600 text-blue-600 bg-blue-50/40'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          1. 접수통계
          <span className="ml-1 text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
            4개 상세
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('scoring')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
            currentTab === 'scoring'
              ? 'border-blue-600 text-blue-600 bg-blue-50/40'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Award className="w-4 h-4" />
          2. 채점통계 (응시결과)
          <span className="ml-1 text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
            3개 상세
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('payment')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
            currentTab === 'payment'
              ? 'border-blue-600 text-blue-600 bg-blue-50/40'
              : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          3. 결제통계 (수납내역)
          <span className="ml-1 text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
            정산합계
          </span>
        </button>
      </div>

      {/* Level 2: Sub-tabs matching the user's reference image style */}
      <div className="px-6 py-2 bg-slate-50/80 flex items-center gap-2 overflow-x-auto text-xs font-medium">
        {currentTab === 'overview' && (
          <div className="py-1 text-slate-600 flex items-center gap-2">
            <span className="font-semibold text-slate-800">핵심 지표 요약:</span>
            <span>접수현황 · 채점결과 · 결제수납 현황을 통합 웹차트로 시각화하여 제공합니다.</span>
          </div>
        )}

        {currentTab === 'registration' && (
          <>
            <button
              onClick={() => setRegSubTab('regional')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                regSubTab === 'regional'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              권역별 접수현황
            </button>
            <button
              onClick={() => setRegSubTab('center')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                regSubTab === 'center'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              시험장 접수현황(통계)
            </button>
            <button
              onClick={() => setRegSubTab('level')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                regSubTab === 'level'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              급수별 접수현황
            </button>
            <button
              onClick={() => setRegSubTab('daily')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                regSubTab === 'daily'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              일자별 접수현황
            </button>
          </>
        )}

        {currentTab === 'scoring' && (
          <>
            <button
              onClick={() => setScoringSubTab('results')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                scoringSubTab === 'results'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              채점결과(통계)
            </button>
            <button
              onClick={() => setScoringSubTab('mean_sd')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                scoringSubTab === 'mean_sd'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              평균표준편차 및 합격자수
            </button>
            <button
              onClick={() => setScoringSubTab('distribution')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                scoringSubTab === 'distribution'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              급수별 성적분포도
            </button>
          </>
        )}

        {currentTab === 'payment' && (
          <>
            <button
              onClick={() => setPaymentSubTab('summary')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                paymentSubTab === 'summary'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              결제합계 (결제대행업체 대조)
            </button>
            <button
              onClick={() => setPaymentSubTab('methods')}
              className={`px-3 py-1.5 rounded transition-all whitespace-nowrap ${
                paymentSubTab === 'methods'
                  ? 'bg-white text-blue-700 font-bold shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              결제수단별 상세 및 환불분석
            </button>
          </>
        )}
      </div>
    </div>
  );
};
