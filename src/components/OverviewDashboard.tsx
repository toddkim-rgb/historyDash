import React from 'react';
import { MainTabType, RegistrationSubTab, ScoringSubTab, PaymentSubTab } from '../types';
import {
  REGIONAL_STATS,
  SCORING_STATS_78,
  MEAN_SD_STATS_78,
  PAYMENT_ROWS_78
} from '../data/mockData';
import { formatNumber, formatCurrency } from '../utils/export';
import {
  Users,
  Award,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Building,
  CheckCircle2,
  AlertTriangle,
  PieChart as PieIcon,
  BarChart3
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ComposedChart,
  Line
} from 'recharts';

interface OverviewDashboardProps {
  onNavigate: (tab: MainTabType, subTab?: string) => void;
  selectedRound: string;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ onNavigate, selectedRound }) => {
  const scoring = SCORING_STATS_78;
  const regionalTop5 = REGIONAL_STATS['제78회'].slice(0, 5);

  const levelPieData = [
    { name: '심화 (1~3급)', value: 128567, color: '#1e3a8a' },
    { name: '기본 (4~6급)', value: 29853, color: '#dc2626' }
  ];

  const gradeDistributionData = [
    { grade: '1급', count: scoring.advanced.grade1, rate: scoring.advanced.grade1Rate },
    { grade: '2급', count: scoring.advanced.grade2, rate: scoring.advanced.grade2Rate },
    { grade: '3급', count: scoring.advanced.grade3, rate: scoring.advanced.grade3Rate },
    { grade: '4급', count: scoring.basic.grade4, rate: scoring.basic.grade4Rate },
    { grade: '5급', count: scoring.basic.grade5, rate: scoring.basic.grade5Rate },
    { grade: '6급', count: scoring.basic.grade6, rate: scoring.basic.grade6Rate }
  ];

  const paymentData = [
    { name: '카카오페이', amount: 12.73, percent: 34.0, color: '#f59e0b' },
    { name: '가상계좌', amount: 9.54, percent: 25.4, color: '#3b82f6' },
    { name: '네이버페이', amount: 9.30, percent: 24.8, color: '#10b981' },
    { name: '신용카드', amount: 5.91, percent: 15.8, color: '#6366f1' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-blue-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              {selectedRound} 정기시험
            </span>
            <span className="text-slate-300 text-xs">최종 확정 통계 데이터</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            한국사능력검정시험 통합 행정 분석 대시보드
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            전국 17개 권역, 311개 시험장의 접수 인원부터 채점 결과(응시/합격률/표준편차), 결제대행업체 수납 대사내역까지 통합 제공합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 p-3 rounded-lg text-xs">
          <div className="text-right">
            <div className="text-slate-400 text-[11px]">응시 완료율</div>
            <div className="text-base font-bold text-emerald-400">86.9%</div>
          </div>
          <div className="h-8 w-px bg-slate-700 mx-2" />
          <div className="text-right">
            <div className="text-slate-400 text-[11px]">전체 합격률</div>
            <div className="text-base font-bold text-blue-400">63.41%</div>
          </div>
        </div>
      </div>

      {/* 4 Master KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. 접수통계 KPI */}
        <div
          onClick={() => onNavigate('registration', 'regional')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">1. 총 접수인원</span>
            <span className="p-1.5 rounded-md bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            158,420<span className="text-sm font-semibold text-slate-500 ml-1">명</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>심화 81.2% | 기본 18.8%</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              상세 <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 2. 채점통계 응시자수 */}
        <div
          onClick={() => onNavigate('scoring', 'results')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">2. 총 응시자수</span>
            <span className="p-1.5 rounded-md bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-900">
            111,759<span className="text-sm font-semibold text-slate-500 ml-1">명</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span className="text-rose-600 font-medium">결시 16,881명 (13.1%)</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              상세 <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 3. 합격자수 및 합격률 */}
        <div
          onClick={() => onNavigate('scoring', 'mean_sd')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">2. 총 합격자 (합격률)</span>
            <span className="p-1.5 rounded-md bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-3xl font-extrabold text-emerald-700">
            70,861<span className="text-sm font-semibold text-slate-500 ml-1">명</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span className="font-semibold text-emerald-600">합격률 63.41% (평균 70.1점)</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              상세 <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 4. 결제통계 수입액 */}
        <div
          onClick={() => onNavigate('payment', 'summary')}
          className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">3. 순 응시료 수입액</span>
            <span className="p-1.5 rounded-md bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold text-blue-900 tracking-tight">
            37억 4,746만원
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>정상결제 134,276건</span>
            <span className="text-blue-600 font-semibold flex items-center gap-0.5">
              상세 <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* 3 Core Blocks Grid matching the User Request */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 1: 1. 접수통계 Section */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">1. 접수통계 현황</h3>
              </div>
              <button
                onClick={() => onNavigate('registration', 'regional')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                전체보기 <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Level donut chart */}
            <div className="py-3">
              <div className="text-xs font-semibold text-slate-600 mb-1">
                급수별 접수 비중 (심화 vs 기본)
              </div>
              <div className="h-40 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={levelPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      innerRadius={30}
                    >
                      {levelPieData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(val: number) => [`${formatNumber(val)}명`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-blue-900">
                  <span className="w-3 h-3 rounded bg-blue-900" /> 심화 128,567명 (81.2%)
                </span>
                <span className="flex items-center gap-1.5 text-rose-800">
                  <span className="w-3 h-3 rounded bg-rose-600" /> 기본 29,853명 (18.8%)
                </span>
              </div>
            </div>

            {/* Quick stats list */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">최대 접수 권역</span>
                <span className="font-bold text-slate-900">경기남부 (27,820명 / 17.6%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">서울권역 합산</span>
                <span className="font-bold text-slate-900">58,780명 (37.2%)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">시험장 평균 접수율</span>
                <span className="font-bold text-emerald-700">92.0% (311개 시험장)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => onNavigate('registration', 'regional')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              권역별 접수
            </button>
            <button
              onClick={() => onNavigate('registration', 'center')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              시험장 접수현황
            </button>
            <button
              onClick={() => onNavigate('registration', 'level')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              급수별 상세
            </button>
          </div>
        </div>

        {/* Module 2: 2. 채점통계 Section */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">2. 채점 및 성적 통계</h3>
              </div>
              <button
                onClick={() => onNavigate('scoring', 'results')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                전체보기 <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Grade distribution small bar */}
            <div className="py-3">
              <div className="text-xs font-semibold text-slate-600 mb-2">
                급수별(1~6급) 합격자 수 분포
              </div>
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDistributionData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip formatter={(val: number) => [`${formatNumber(val)}명`, '합격자']} />
                    <Bar dataKey="count" fill="#1e3a8a" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mean & SD highlights */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">전체 평균 / 표준편차</span>
                <span className="font-bold text-slate-900">70.1점 / 17.7점</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">심화 합격률 (1~3급)</span>
                <span className="font-bold text-blue-800">64.19% (64,080명)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">기본 합격률 (4~6급)</span>
                <span className="font-bold text-rose-800">56.87% (6,781명)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => onNavigate('scoring', 'results')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              채점 집계표
            </button>
            <button
              onClick={() => onNavigate('scoring', 'mean_sd')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              평균 및 표준편차
            </button>
          </div>
        </div>

        {/* Module 3: 3. 결제통계 Section */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">3. 결제 및 수납 통계</h3>
              </div>
              <button
                onClick={() => onNavigate('payment', 'summary')}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
              >
                전체보기 <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Payment methods list with progress */}
            <div className="py-3 space-y-2.5">
              <div className="text-xs font-semibold text-slate-600 mb-1">
                결제수단별 수납액 점유율
              </div>
              {paymentData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="font-bold text-slate-900">
                      {item.amount}억원 ({item.percent}%)
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Payment KPIs */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">총 결제 대행액</span>
                <span className="font-bold text-slate-900">42억 6,656만원</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">취소 및 환불액</span>
                <span className="font-bold text-rose-700">- 5억 1,910만원</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <span className="text-slate-600">순 국고 수납액</span>
                <span className="font-extrabold text-blue-900">37억 4,746만원</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => onNavigate('payment', 'summary')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              결제 대사표
            </button>
            <button
              onClick={() => onNavigate('payment', 'methods')}
              className="flex-1 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
            >
              환불 분석
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
