import React from 'react';
import { ShieldCheck, Calendar, Bell, HelpCircle, FileSpreadsheet, User } from 'lucide-react';
import { MainTabType } from '../types';

interface HeaderProps {
  currentTab: MainTabType;
  subTitle: string;
  selectedRound: string;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, subTitle, selectedRound }) => {
  const getTabLabel = (tab: MainTabType) => {
    switch (tab) {
      case 'overview':
        return '종합 통계 대시보드';
      case 'registration':
        return '접수통계';
      case 'scoring':
        return '채점통계';
      case 'payment':
        return '결제통계';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Top Banner with National Emblem / Government Identity */}
      <div className="border-b border-slate-100 px-6 py-2.5 flex items-center justify-between text-xs text-slate-600 bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold text-slate-800">한국사능력검정시험 통합관리자 포털</span>
            <span className="text-slate-300">|</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium text-[11px]">
              운영시스템 v4.8
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-slate-500">서버 정상 운영중</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>최고관리자 (국사편찬위원회)</span>
          </div>
          <span className="text-slate-300">|</span>
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            로그아웃
          </button>
        </div>
      </div>

      {/* Main Bar matching image header */}
      <div className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Official Badge Icon */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                  {subTitle}
                </h1>
                <span className="text-sm font-medium text-slate-500">· {selectedRound}</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                국가공인 한국사능력검정시험 공식 통계 집계 및 실시간 현황 분석 시스템
              </p>
            </div>
          </div>
        </div>

        {/* Right side Logo matching the user's reference image */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="border border-slate-200 rounded px-3 py-1.5 bg-white shadow-2xs flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-slate-300">
              로고
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-medium leading-none">국가편찬위원회</div>
              <div className="text-xs font-bold text-slate-800 tracking-tight mt-0.5">한국사능력검정시험</div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb row */}
      <div className="px-6 py-1.5 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-1.5">
        <span className="hover:text-slate-700 cursor-pointer">Home</span>
        <span>›</span>
        <span className="hover:text-slate-700 cursor-pointer">통계 관리</span>
        <span>›</span>
        <span className="text-slate-700 font-medium">{getTabLabel(currentTab)}</span>
        <span>›</span>
        <span className="text-blue-600 font-semibold">{subTitle}</span>
      </div>
    </header>
  );
};
