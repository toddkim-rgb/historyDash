import React from 'react';
import { FilterState, ScoringSubTab } from '../types';
import { SCORING_STATS_78, MEAN_SD_STATS_78, SCORE_DISTRIBUTION_DATA } from '../data/mockData';
import { formatNumber } from '../utils/export';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { Award, UserCheck, Percent, HelpCircle, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface ScoringStatsProps {
  subTab: ScoringSubTab;
  filters: FilterState;
}

export const ScoringStats: React.FC<ScoringStatsProps> = ({ subTab, filters }) => {
  const stats = SCORING_STATS_78;
  const meanSdList = MEAN_SD_STATS_78;

  // Grade bar chart data (1급 ~ 6급)
  const gradeDistributionData = [
    { grade: '1급 (심화 80점↑)', passCount: stats.advanced.grade1, passRate: stats.advanced.grade1Rate, type: '심화' },
    { grade: '2급 (심화 70~79점)', passCount: stats.advanced.grade2, passRate: stats.advanced.grade2Rate, type: '심화' },
    { grade: '3급 (심화 60~69점)', passCount: stats.advanced.grade3, passRate: stats.advanced.grade3Rate, type: '심화' },
    { grade: '4급 (기본 80점↑)', passCount: stats.basic.grade4, passRate: stats.basic.grade4Rate, type: '기본' },
    { grade: '5급 (기본 70~79점)', passCount: stats.basic.grade5, passRate: stats.basic.grade5Rate, type: '기본' },
    { grade: '6급 (기본 60~69점)', passCount: stats.basic.grade6, passRate: stats.basic.grade6Rate, type: '기본' }
  ];

  // Gender comparison chart data
  const genderComparisonData = [
    { category: '심화 (남성)', 평균: 68.4, 표준편차: 18.2, 합격률: 63.04 },
    { category: '심화 (여성)', 평균: 71.2, 표준편차: 17.5, 합격률: 65.60 },
    { category: '기본 (남성)', 평균: 72.8, 표준편차: 16.8, 합격률: 55.70 },
    { category: '기본 (여성)', 평균: 74.5, 표준편차: 15.6, 합격률: 58.19 }
  ];

  return (
    <div className="space-y-5">
      {/* 1. 채점결과(통계) View (Matches Image 4) */}
      {subTab === 'results' && (
        <>
          {/* Key Summary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">총 응시자 수</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatNumber(stats.testTakers)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                지원 {formatNumber(stats.totalApplicants)}명 중 응시율 86.9% (결시 {formatNumber(stats.absentees)}명)
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">총 합격자 수</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-emerald-700 tracking-tight">
                  {formatNumber(stats.passedCount)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-600">
                심화 {formatNumber(stats.advanced.passedCount)}명 / 기본 {formatNumber(stats.basic.passedCount)}명
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">전체 합격률</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-blue-900 tracking-tight">
                  {stats.overallPassRate}
                </span>
                <span className="text-sm font-semibold text-slate-500">%</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                심화 {stats.advanced.passRate}% | 기본 {stats.basic.passRate}%
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">만점자 (100점)</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-amber-600 tracking-tight">
                  {formatNumber(stats.advanced.maxScoreHolders + stats.basic.maxScoreHolders)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                심화 {stats.advanced.maxScoreHolders}명, 기본 {stats.basic.maxScoreHolders}명
              </div>
            </div>
          </div>

          {/* Visual Chart: Grades Breakdown (1급 ~ 6급) */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  급수별(1급~6급) 합격자 수 및 합격률 분석 차트
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  심화(1~3급) 및 기본(4~6급) 급수별 취득 현황 시각화
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-blue-800 rounded" /> 합격인원(명)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-1 bg-amber-500 rounded" /> 취득비율(%)
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={gradeDistributionData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(val: number, name: string) => [
                      name === 'passCount' ? `${formatNumber(val)}명` : `${val}%`,
                      name === 'passCount' ? '취득자 수' : '비율'
                    ]}
                  />
                  <Bar yAxisId="left" dataKey="passCount" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="passRate" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Authentic Grading Table matching Image 4 */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                제78회 한국사능력검정시험 채점 통계 집계표
              </span>
              <span className="text-[11px] text-slate-500">
                한국사능력검정시험 규정 기준
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    <th rowSpan={2} className="py-2.5 px-4 border-r border-slate-200 w-32">
                      구분
                    </th>
                    <th colSpan={3} className="py-2 px-3 border-r border-slate-200 bg-blue-50/40 text-blue-950">
                      심화
                    </th>
                    <th colSpan={3} className="py-2 px-3 border-r border-slate-200 bg-rose-50/40 text-rose-950">
                      기본
                    </th>
                    <th rowSpan={2} className="py-2.5 px-4 w-32 bg-slate-100">
                      합계
                    </th>
                  </tr>
                  <tr className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200 text-[11px]">
                    <th className="py-1.5 px-3 border-r border-slate-200">1급</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">2급</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">3급</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">4급</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">5급</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">6급</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {/* 지원자수 */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      지원자수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-medium">
                      {formatNumber(stats.advanced.applicants)}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-medium">
                      {formatNumber(stats.basic.applicants)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 bg-slate-50/50">
                      {formatNumber(stats.totalApplicants)}
                    </td>
                  </tr>

                  {/* 결시자수 (Red in Image 4) */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      결시자수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-bold text-rose-600">
                      {formatNumber(stats.advanced.absentees)}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-bold text-rose-600">
                      {formatNumber(stats.basic.absentees)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-rose-600 bg-slate-50/50">
                      {formatNumber(stats.absentees)}
                    </td>
                  </tr>

                  {/* 응시자수 */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      응시자수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-semibold text-blue-900">
                      {formatNumber(stats.advanced.testTakers)}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-semibold text-blue-900">
                      {formatNumber(stats.basic.testTakers)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-blue-900 bg-slate-50/50">
                      {formatNumber(stats.testTakers)}
                    </td>
                  </tr>

                  {/* 불합격자수 */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      불합격자수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {formatNumber(stats.advanced.failedCount)}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {formatNumber(stats.basic.failedCount)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-700 bg-slate-50/50">
                      {formatNumber(stats.failedCount)}
                    </td>
                  </tr>

                  {/* 합격자수 (Yellow highlight matching Image 4) */}
                  <tr className="bg-amber-50/90 font-bold text-slate-900 border-y border-amber-200">
                    <td className="py-2.5 px-4 border-r border-amber-200 text-left pl-6 text-amber-900">
                      합격자수
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-blue-900">
                      {formatNumber(stats.advanced.grade1)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-blue-900">
                      {formatNumber(stats.advanced.grade2)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-blue-900">
                      {formatNumber(stats.advanced.grade3)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-rose-800">
                      {formatNumber(stats.basic.grade4)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-rose-800">
                      {formatNumber(stats.basic.grade5)}
                    </td>
                    <td className="py-2.5 px-3 border-r border-amber-200 text-rose-800">
                      {formatNumber(stats.basic.grade6)}
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 bg-amber-100/40">
                      —
                    </td>
                  </tr>

                  {/* 급수별 합격률 */}
                  <tr className="hover:bg-slate-50 font-medium">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      급수별 합격률
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.advanced.grade1Rate}%</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.advanced.grade2Rate}%</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.advanced.grade3Rate}%</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.basic.grade4Rate}%</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.basic.grade5Rate}%</td>
                    <td className="py-2.5 px-3 border-r border-slate-200">{stats.basic.grade6Rate}%</td>
                    <td className="py-2.5 px-4 text-slate-400 bg-slate-50/50">—</td>
                  </tr>

                  {/* 전체합격자수 */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      전체합격자수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-extrabold text-blue-900">
                      {formatNumber(stats.advanced.passedCount)}
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-extrabold text-rose-800">
                      {formatNumber(stats.basic.passedCount)}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-slate-400 bg-slate-50/50">—</td>
                  </tr>

                  {/* 전체합격률(%) */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      전체합격률(%)
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-bold text-blue-700">
                      {stats.advanced.passRate}%
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-bold text-rose-700">
                      {stats.basic.passRate}%
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 bg-slate-50/50">—</td>
                  </tr>

                  {/* 최고점수 */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-slate-800 text-left pl-6">
                      최고점수
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-700">
                      100점 ({stats.advanced.maxScoreHolders}명)
                    </td>
                    <td colSpan={3} className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-700">
                      100점 ({stats.basic.maxScoreHolders}명)
                    </td>
                    <td className="py-2.5 px-4 text-slate-400 bg-slate-50/50">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 2. 평균표준편차 및 합격자수 View (Matches Image 5) */}
      {subTab === 'mean_sd' && (
        <>
          {/* Visual Bar Comparison Chart */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-800 mb-4">
              급수 및 성별 평균점수와 합격률 비교
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genderComparisonData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="평균" fill="#2563eb" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="표준편차" fill="#94a3b8" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="합격률" fill="#10b981" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table matching Image 5 */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                급수 및 성별 평균·표준편차 및 합격자 수 현황
              </span>
              <span className="text-[11px] text-slate-500">
                점수범위: 0점 ~ 100점
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-4 border-r border-slate-200 w-28">급수</th>
                    <th className="py-2.5 px-4 border-r border-slate-200 w-24">성별</th>
                    <th className="py-2.5 px-4 border-r border-slate-200 text-right">응시자수</th>
                    <th className="py-2.5 px-4 border-r border-slate-200 text-right">평균</th>
                    <th className="py-2.5 px-4 border-r border-slate-200 text-right">표준편차</th>
                    <th className="py-2.5 px-4 border-r border-slate-200 text-right">합격자수</th>
                    <th className="py-2.5 px-4 text-right">합격률</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {meanSdList.map((row, idx) => {
                    const isSumRow = row.gender === '합계';
                    const isTotalRow = row.gender === '총합계';
                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${
                          isTotalRow
                            ? 'bg-blue-50/80 font-bold text-blue-950 border-t-2 border-blue-300'
                            : isSumRow
                            ? 'bg-slate-50/80 font-bold text-slate-900'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-4 border-r border-slate-200 font-semibold">
                          {row.level}
                        </td>
                        <td className="py-2.5 px-4 border-r border-slate-200">{row.gender}</td>
                        <td className="py-2.5 px-4 border-r border-slate-200 text-right">
                          {formatNumber(row.takers)}
                        </td>
                        <td className="py-2.5 px-4 border-r border-slate-200 text-right font-medium">
                          {row.mean.toFixed(1)}
                        </td>
                        <td className="py-2.5 px-4 border-r border-slate-200 text-right text-slate-600">
                          {row.stdDev.toFixed(1)}
                        </td>
                        <td
                          className={`py-2.5 px-4 border-r border-slate-200 text-right font-semibold ${
                            isTotalRow ? 'text-blue-900' : 'text-emerald-700'
                          }`}
                        >
                          {formatNumber(row.passCount)}
                        </td>
                        <td
                          className={`py-2.5 px-4 text-right font-bold ${
                            isTotalRow ? 'text-blue-700' : 'text-slate-800'
                          }`}
                        >
                          {row.passRate.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Note matching Image 5 */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-200 text-xs text-slate-500 leading-relaxed">
              ※ 등급별 합계·전체 총합계 행의 평균·표준편차는 응시자수 가중평균으로 계산됩니다. 정확한 통합 표준편차는 별도 통계식(분산 합산) 적용이 필요합니다.
            </div>
          </div>
        </>
      )}

      {/* 3. 성적분포도 View */}
      {subTab === 'distribution' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">점수 구간대별 인원 분포도 (성적 곡선)</h3>
            <p className="text-xs text-slate-500 mt-1">
              전체 응시자의 10점 단위 구간별 취득 분포 및 과락(심화 60점 미만 / 기본 60점 미만) 비율
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SCORE_DISTRIBUTION_DATA} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: number) => [`${formatNumber(val)}명`, '취득 인원']} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
