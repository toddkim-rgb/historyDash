import React, { useMemo } from 'react';
import { FilterState, RegistrationSubTab, RegionalStat, TestCenterStat } from '../types';
import { REGIONAL_STATS, TEST_CENTERS, DAILY_REGISTRATION_TREND } from '../data/mockData';
import { formatNumber, exportToCSV } from '../utils/export';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Users, AlertTriangle, CheckCircle2, TrendingUp, MapPin, Building, BarChart2 } from 'lucide-react';

interface RegistrationStatsProps {
  subTab: RegistrationSubTab;
  filters: FilterState;
}

export const RegistrationStats: React.FC<RegistrationStatsProps> = ({ subTab, filters }) => {
  const currentRound = filters.round || '제78회';
  const regionalData = useMemo(() => {
    const list = REGIONAL_STATS[currentRound] || REGIONAL_STATS['제78회'];
    if (filters.district && filters.district !== '전체') {
      return list.filter((r) => r.region.includes(filters.district));
    }
    return list;
  }, [currentRound, filters.district]);

  const testCenterData = useMemo(() => {
    const list = TEST_CENTERS[currentRound] || TEST_CENTERS['제78회'];
    if (filters.district && filters.district !== '전체') {
      return list.filter((c) => c.district.includes(filters.district));
    }
    return list;
  }, [currentRound, filters.district]);

  // Aggregate totals
  const totalApplicants = regionalData.reduce((acc, cur) => acc + cur.total, 0);
  const totalAdvanced = regionalData.reduce((acc, cur) => acc + cur.advanced, 0);
  const totalBasic = regionalData.reduce((acc, cur) => acc + cur.basic, 0);
  const advancedPercent = totalApplicants ? ((totalAdvanced / totalApplicants) * 100).toFixed(1) : '0';
  const basicPercent = totalApplicants ? ((totalBasic / totalApplicants) * 100).toFixed(1) : '0';

  // Pie chart data for level distribution
  const pieData = [
    { name: '심화', value: totalAdvanced, color: '#1e3a8a', percent: advancedPercent },
    { name: '기본', value: totalBasic, color: '#b91c1c', percent: basicPercent }
  ];

  // Test centers aggregates
  const centerTotals = useMemo(() => {
    return testCenterData.reduce(
      (acc, cur) => ({
        assignedAdvanced: acc.assignedAdvanced + cur.assignedAdvanced,
        assignedBasic: acc.assignedBasic + cur.assignedBasic,
        registeredAdvanced: acc.registeredAdvanced + cur.registeredAdvanced,
        registeredBasic: acc.registeredBasic + cur.registeredBasic,
        availableAdvanced: acc.availableAdvanced + cur.availableAdvanced,
        availableBasic: acc.availableBasic + cur.availableBasic
      }),
      {
        assignedAdvanced: 0,
        assignedBasic: 0,
        registeredAdvanced: 0,
        registeredBasic: 0,
        availableAdvanced: 0,
        availableBasic: 0
      }
    );
  }, [testCenterData]);

  const centerRateAdv = centerTotals.assignedAdvanced
    ? ((centerTotals.registeredAdvanced / centerTotals.assignedAdvanced) * 100).toFixed(1)
    : '0';
  const centerRateBasic = centerTotals.assignedBasic
    ? ((centerTotals.registeredBasic / centerTotals.assignedBasic) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-5">
      {/* 1. 권역별 접수현황 View (Matches Image 1) */}
      {subTab === 'regional' && (
        <>
          <div className="text-xs text-slate-500 mb-2">
            회차·지역·권역·결제상태별 권역X시험종류 접수 인원과 합계를 조회합니다.
          </div>

          {/* 4 KPI Cards matching Image 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">총 접수자</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatNumber(totalApplicants || 158420)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 전회차 대비 +3,850명 (2.5% 증가)
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">심화</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-blue-900 tracking-tight">
                  {formatNumber(totalAdvanced || 128567)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs font-bold text-blue-600">{advancedPercent}%</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">기본</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-rose-800 tracking-tight">
                  {formatNumber(totalBasic || 29853)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs font-bold text-rose-600">{basicPercent}%</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">권역 수</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {regionalData.length}
                </span>
                <span className="text-sm font-semibold text-slate-500">개</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">전국 17개 권역 정상 집계중</div>
            </div>
          </div>

          {/* Regional Visual Chart */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-600" />
                  주요 권역별 심화 및 기본 접수인원 분포
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  각 권역의 총 접수인원 규모 및 급수별(심화 vs 기본) 구성비 비교
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-3 rounded bg-blue-900" /> 심화
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-3 rounded bg-rose-600" /> 기본
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData.slice(0, 10)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="region" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `${val / 1000}k`} />
                  <Tooltip
                    formatter={(val: number, name: string) => [
                      `${formatNumber(val)}명`,
                      name === 'advanced' ? '심화' : '기본'
                    ]}
                  />
                  <Bar dataKey="advanced" name="심화" fill="#1e3a8a" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="basic" name="기본" fill="#dc2626" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table matching Image 1 */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                권역별 세부 접수현황 테이블 (총 {regionalData.length}건)
              </span>
              <span className="text-[11px] text-slate-500">
                단위: 명, % (기준: 실시간 확정 데이터)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-4 w-36">권역</th>
                    <th className="py-2.5 px-4 text-right">심화</th>
                    <th className="py-2.5 px-4 text-right">기본</th>
                    <th className="py-2.5 px-4 text-right">합계</th>
                    <th className="py-2.5 px-4 w-48 text-left">비율</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {regionalData.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{row.region}</td>
                      <td className="py-2.5 px-4 text-right font-medium">{formatNumber(row.advanced)}</td>
                      <td className="py-2.5 px-4 text-right font-medium text-slate-600">{formatNumber(row.basic)}</td>
                      <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatNumber(row.total)}</td>
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.min(row.percentage * 5, 100)}%`,
                                backgroundColor:
                                  row.percentage > 15
                                    ? '#059669'
                                    : row.percentage > 10
                                    ? '#2563eb'
                                    : '#e11d48'
                              }}
                            />
                          </div>
                          <span className="w-11 text-right font-semibold text-slate-600">
                            {row.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 2. 시험장 접수현황(통계) View (Matches Image 2) */}
      {subTab === 'center' && (
        <>
          {/* Red Notice Box matching Image 2 */}
          <div className="border border-rose-300 bg-rose-50/70 text-rose-700 px-4 py-3 rounded-md text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>* 장애인 접수 현황은 빠져있습니다. (별도 특별시험장 관리 탭에서 확인 가능합니다.)</span>
          </div>

          {/* Test Center Capacity Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">배정 인원 대비 접수인원</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {formatNumber(centerTotals.registeredAdvanced + centerTotals.registeredBasic)} /{' '}
                {formatNumber(centerTotals.assignedAdvanced + centerTotals.assignedBasic)}명
              </div>
              <div className="text-xs text-blue-600 mt-1 font-semibold">
                전체 수용률 92.0%
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">심화 평균 접수율</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{centerRateAdv}%</div>
              <div className="text-xs text-slate-500 mt-1">
                잔여 {formatNumber(centerTotals.availableAdvanced)}석 접수가능
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-500">기본 평균 접수율</div>
              <div className="text-2xl font-bold text-rose-800 mt-1">{centerRateBasic}%</div>
              <div className="text-xs text-slate-500 mt-1">
                잔여 {formatNumber(centerTotals.availableBasic)}석 접수가능
              </div>
            </div>
          </div>

          {/* Table matching Image 2 */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                시험장별 접수 및 잔여석 현황 (총 {testCenterData.length}개 시험장)
              </span>
              <span className="text-[11px] text-slate-500">
                접수율 95% 이상은 마감 임박 상태를 나타냅니다.
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="bg-slate-100/90 text-slate-700 font-semibold border-b border-slate-200">
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-slate-200 w-24">
                      권역
                    </th>
                    <th rowSpan={2} className="py-2.5 px-4 border-r border-slate-200 text-left">
                      시험장명
                    </th>
                    <th colSpan={2} className="py-2 px-3 border-r border-slate-200 bg-slate-200/50">
                      배정인원
                    </th>
                    <th colSpan={2} className="py-2 px-3 border-r border-slate-200 bg-slate-200/50">
                      접수인원
                    </th>
                    <th colSpan={2} className="py-2 px-3 border-r border-slate-200 bg-slate-200/50">
                      접수가능인원
                    </th>
                    <th colSpan={2} className="py-2 px-3 bg-amber-50">
                      시험장 접수율
                    </th>
                  </tr>
                  <tr className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200 text-[11px]">
                    <th className="py-1.5 px-3 border-r border-slate-200">심화</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">기본</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">심화</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">기본</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">심화</th>
                    <th className="py-1.5 px-3 border-r border-slate-200">기본</th>
                    <th className="py-1.5 px-3 border-r border-slate-200 text-amber-700 font-semibold">
                      심화
                    </th>
                    <th className="py-1.5 px-3 text-amber-700 font-semibold">기본</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {testCenterData.map((center) => (
                    <tr key={center.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-600">
                        {center.district}
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200 text-left font-semibold text-slate-900">
                        {center.centerName}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200">{center.assignedAdvanced}</td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                        {center.assignedBasic}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-blue-900">
                        {center.registeredAdvanced}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-rose-800">
                        {center.registeredBasic}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                        {center.availableAdvanced}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                        {center.availableBasic}
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-amber-600">
                        {center.rateAdvanced}%
                      </td>
                      <td className="py-2.5 px-3 font-bold text-amber-600">{center.rateBasic}%</td>
                    </tr>
                  ))}
                  {/* Total Row matching Image 2 */}
                  <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td colSpan={2} className="py-3 px-4 text-center border-r border-slate-300">
                      총계
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      {formatNumber(centerTotals.assignedAdvanced)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      {formatNumber(centerTotals.assignedBasic)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-blue-900">
                      {formatNumber(centerTotals.registeredAdvanced)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-rose-800">
                      {formatNumber(centerTotals.registeredBasic)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      {formatNumber(centerTotals.availableAdvanced)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300">
                      {formatNumber(centerTotals.availableBasic)}
                    </td>
                    <td className="py-3 px-3 border-r border-slate-300 text-amber-700">
                      {centerRateAdv}%
                    </td>
                    <td className="py-3 px-3 text-amber-700">{centerRateBasic}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 3. 급수별 접수현황 View (Matches Image 3) */}
      {subTab === 'level' && (
        <>
          {/* 4 KPI Cards matching Image 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">심화</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-blue-950 tracking-tight">
                  {formatNumber(totalAdvanced || 128567)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs font-bold text-blue-700">{advancedPercent}%</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">기본</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-rose-800 tracking-tight">
                  {formatNumber(totalBasic || 29853)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs font-bold text-rose-700">{basicPercent}%</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">총 접수</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatNumber(totalApplicants || 158420)}
                </span>
                <span className="text-sm font-semibold text-slate-500">명</span>
              </div>
              <div className="mt-2 text-xs text-slate-400">정원 대비 94.6% 접수완료</div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
              <div className="text-xs font-semibold text-slate-500">결제완료율</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  96.8
                </span>
                <span className="text-sm font-semibold text-slate-500">%</span>
              </div>
              <div className="mt-2 text-xs font-medium text-emerald-600">
                결제대기 3.2% (기한 내 미결제 시 자동 취소)
              </div>
            </div>
          </div>

          {/* Donut Chart and Legend matching Image 3 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-800 mb-6">
              급수별(심화 vs 기본) 접수인원 비율 차트
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={0}
                      label={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${formatNumber(value)}명`, '접수자']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Exact Legend style matching image 3 */}
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded bg-[#1e3a8a]" />
                    <span className="text-sm font-bold text-slate-800">심화 (1급~3급)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 mr-2">
                      {formatNumber(totalAdvanced || 128567)}
                    </span>
                    <span className="text-sm font-bold text-blue-700">{advancedPercent}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <span className="w-4 h-4 rounded bg-[#dc2626]" />
                    <span className="text-sm font-bold text-slate-800">기본 (4급~6급)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-900 mr-2">
                      {formatNumber(totalBasic || 29853)}
                    </span>
                    <span className="text-sm font-bold text-rose-700">{basicPercent}%</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/60 rounded border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  💡 <strong>심화 응시율 분석:</strong> 취업 및 공무원/공기업 채용 가산점(2·3급 이상 필수)으로 인해 심화 시험 신청 비중이 전체의 81%를 상회하고 있습니다.
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 4. 일자별 접수현황 View */}
      {subTab === 'daily' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">일자별 접수 추이 및 누적 인원</h3>
            <p className="text-xs text-slate-500 mt-1">
              접수 개시일(1일차) 집중 현황 및 마감일까지의 일별 유입량 추이
            </p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_REGISTRATION_TREND} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip formatter={(val: number) => [`${formatNumber(val)}명`, '']} />
                <Legend />
                <Area type="monotone" dataKey="count" name="당일 접수자" stroke="#2563eb" fillOpacity={1} fill="url(#colorDaily)" />
                <Area type="monotone" dataKey="cumulative" name="누적 접수자" stroke="#059669" fillOpacity={0.1} fill="#059669" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
