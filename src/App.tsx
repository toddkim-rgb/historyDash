import React, { useState } from 'react';
import { MainTabType, RegistrationSubTab, ScoringSubTab, PaymentSubTab, FilterState } from './types';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { FilterBar } from './components/FilterBar';
import { RegistrationStats } from './components/RegistrationStats';
import { ScoringStats } from './components/ScoringStats';
import { PaymentStats } from './components/PaymentStats';
import { OverviewDashboard } from './components/OverviewDashboard';
import { exportToCSV } from './utils/export';
import {
  REGIONAL_STATS,
  TEST_CENTERS,
  SCORING_STATS_78,
  MEAN_SD_STATS_78,
  PAYMENT_ROWS_78
} from './data/mockData';
import { CheckCircle2, Download } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<MainTabType>('overview');
  const [regSubTab, setRegSubTab] = useState<RegistrationSubTab>('regional');
  const [scoringSubTab, setScoringSubTab] = useState<ScoringSubTab>('results');
  const [paymentSubTab, setPaymentSubTab] = useState<PaymentSubTab>('summary');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    round: '제78회',
    region: '전체',
    district: '전체',
    occupation: '전체',
    paymentStatus: '전체'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      round: '제78회',
      region: '전체',
      district: '전체',
      occupation: '전체',
      paymentStatus: '전체'
    });
    showToast('검색 필터가 초기화되었습니다.');
  };

  // Determine subTitle for Header matching image headers
  const getSubTitle = (): string => {
    if (currentTab === 'overview') return '종합 통계 대시보드';
    if (currentTab === 'registration') {
      switch (regSubTab) {
        case 'regional':
          return '권역별 접수현황';
        case 'center':
          return '시험장 접수현황(통계)';
        case 'level':
          return '급수별 접수현황';
        case 'daily':
          return '일자별 접수현황';
      }
    }
    if (currentTab === 'scoring') {
      switch (scoringSubTab) {
        case 'results':
          return '채점결과';
        case 'mean_sd':
          return '평균표준편차 및 합격자 수';
        case 'distribution':
          return '급수별 성적분포도';
      }
    }
    if (currentTab === 'payment') {
      switch (paymentSubTab) {
        case 'summary':
          return '결제합계';
        case 'methods':
          return '결제종류/급수별 현황';
      }
    }
    return '통계 현황';
  };

  // Dedicated Excel export for each current view
  const handleExport = () => {
    const round = filters.round;
    if (currentTab === 'registration') {
      if (regSubTab === 'regional') {
        const data = REGIONAL_STATS[round] || REGIONAL_STATS['제78회'];
        const headers = ['권역', '심화(명)', '기본(명)', '합계(명)', '비율(%)'];
        const rows = data.map((d) => [d.region, d.advanced, d.basic, d.total, `${d.percentage}%`]);
        exportToCSV(`${round}_권역별접수현황`, headers, rows);
      } else if (regSubTab === 'center') {
        const data = TEST_CENTERS[round] || TEST_CENTERS['제78회'];
        const headers = [
          '권역',
          '시험장명',
          '배정인원(심화)',
          '배정인원(기본)',
          '접수인원(심화)',
          '접수인원(기본)',
          '접수가능인원(심화)',
          '접수가능인원(기본)',
          '접수율(심화)',
          '접수율(기본)'
        ];
        const rows = data.map((c) => [
          c.district,
          c.centerName,
          c.assignedAdvanced,
          c.assignedBasic,
          c.registeredAdvanced,
          c.registeredBasic,
          c.availableAdvanced,
          c.availableBasic,
          `${c.rateAdvanced}%`,
          `${c.rateBasic}%`
        ]);
        exportToCSV(`${round}_시험장접수현황`, headers, rows);
      } else {
        const headers = ['급수구분', '접수인원(명)', '비율(%)'];
        const rows = [
          ['심화', 128567, '81.2%'],
          ['기본', 29853, '18.8%'],
          ['총계', 158420, '100.0%']
        ];
        exportToCSV(`${round}_급수별접수현황`, headers, rows);
      }
    } else if (currentTab === 'scoring') {
      if (scoringSubTab === 'results') {
        const s = SCORING_STATS_78;
        const headers = ['구분', '1급', '2급', '3급', '4급', '5급', '6급', '합계'];
        const rows = [
          ['지원자수', s.advanced.applicants, '-', '-', s.basic.applicants, '-', '-', s.totalApplicants],
          ['결시자수', s.advanced.absentees, '-', '-', s.basic.absentees, '-', '-', s.absentees],
          ['응시자수', s.advanced.testTakers, '-', '-', s.basic.testTakers, '-', '-', s.testTakers],
          ['불합격자수', s.advanced.failedCount, '-', '-', s.basic.failedCount, '-', '-', s.failedCount],
          [
            '합격자수',
            s.advanced.grade1,
            s.advanced.grade2,
            s.advanced.grade3,
            s.basic.grade4,
            s.basic.grade5,
            s.basic.grade6,
            s.passedCount
          ],
          [
            '급수별합격률',
            `${s.advanced.grade1Rate}%`,
            `${s.advanced.grade2Rate}%`,
            `${s.advanced.grade3Rate}%`,
            `${s.basic.grade4Rate}%`,
            `${s.basic.grade5Rate}%`,
            `${s.basic.grade6Rate}%`,
            `${s.overallPassRate}%`
          ]
        ];
        exportToCSV(`${round}_채점결과통계`, headers, rows);
      } else {
        const headers = ['급수', '성별', '응시자수', '평균', '표준편차', '합격자수', '합격률'];
        const rows = MEAN_SD_STATS_78.map((m) => [
          m.level,
          m.gender,
          m.takers,
          m.mean,
          m.stdDev,
          m.passCount,
          `${m.passRate}%`
        ]);
        exportToCSV(`${round}_평균표준편차`, headers, rows);
      }
    } else if (currentTab === 'payment') {
      const headers = [
        '결제구분',
        '구분',
        '정상결제건수',
        '전체취소건수',
        '부분취소(50%)',
        '부분취소(75%)',
        '전체결제건수',
        '전체결제금액',
        '수급자정상',
        '응시료수입액(순수입)'
      ];
      const rows = PAYMENT_ROWS_78.map((p) => [
        p.method,
        p.subType,
        p.normalCount,
        p.refund100Count,
        p.refund50Count,
        p.refund75Count,
        p.totalGeneralCount,
        p.totalGeneralAmount,
        p.beneficiaryNormalCount,
        p.netRevenue
      ]);
      exportToCSV(`${round}_결제합계통계`, headers, rows);
    } else {
      // Overview export
      const headers = ['항목', '값', '비고'];
      const rows = [
        ['총 접수인원', 158420, '심화 128,567명 / 기본 29,853명'],
        ['총 응시자수', 111759, '지원 128,640명 중 결시 16,881명'],
        ['총 합격자수', 70861, '전체 합격률 63.41%'],
        ['순 응시료 수입액', 3747465000, '총 결제 4,266,567,000원 - 환불액 차감']
      ];
      exportToCSV(`${round}_종합대시보드요약`, headers, rows);
    }
    showToast('엑셀(CSV) 파일이 성공적으로 다운로드되었습니다.');
  };

  const handleNavigate = (tab: MainTabType, subTab?: string) => {
    setCurrentTab(tab);
    if (tab === 'registration' && subTab) {
      setRegSubTab(subTab as RegistrationSubTab);
    } else if (tab === 'scoring' && subTab) {
      setScoringSubTab(subTab as ScoringSubTab);
    } else if (tab === 'payment' && subTab) {
      setPaymentSubTab(subTab as PaymentSubTab);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f7] flex flex-col">
      {/* Top Government Admin Header */}
      <Header
        currentTab={currentTab}
        subTitle={getSubTitle()}
        selectedRound={filters.round}
      />

      {/* Primary & Sub-level Tabs */}
      <NavigationTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        regSubTab={regSubTab}
        setRegSubTab={setRegSubTab}
        scoringSubTab={scoringSubTab}
        setScoringSubTab={setScoringSubTab}
        paymentSubTab={paymentSubTab}
        setPaymentSubTab={setPaymentSubTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Global Filter Toolbar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          onExport={handleExport}
          showDateFilter={currentTab === 'payment'}
          showOccupation={currentTab === 'registration' && regSubTab === 'regional'}
          showDistrict={currentTab === 'registration'}
          showPaymentStatus={currentTab === 'registration' || currentTab === 'payment'}
        />

        {/* Content Router */}
        {currentTab === 'overview' && (
          <OverviewDashboard
            onNavigate={handleNavigate}
            selectedRound={filters.round}
          />
        )}

        {currentTab === 'registration' && (
          <RegistrationStats
            subTab={regSubTab}
            filters={filters}
          />
        )}

        {currentTab === 'scoring' && (
          <ScoringStats
            subTab={scoringSubTab}
            filters={filters}
          />
        )}

        {currentTab === 'payment' && (
          <PaymentStats
            subTab={paymentSubTab}
            filters={filters}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            국사편찬위원회 한국사능력검정시험 관리통계시스템 | 세종특별자치시 아름동 123-45
          </span>
          <span className="text-slate-400">
            시스템 문의: 02-1234-5678 (평일 09:00~18:00) | 보안등급: 관리자 보안 인가
          </span>
        </div>
      </footer>
    </div>
  );
}
