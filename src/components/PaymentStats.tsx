import React, { useState } from 'react';
import { FilterState, PaymentSubTab } from '../types';
import { PAYMENT_ROWS_78 } from '../data/mockData';
import { formatNumber, formatCurrency } from '../utils/export';
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
  Legend
} from 'recharts';
import {
  CreditCard,
  AlertCircle,
  HelpCircle,
  DollarSign,
  ArrowRight,
  Workflow,
  CheckCircle,
  RefreshCw,
  Info
} from 'lucide-react';

interface PaymentStatsProps {
  subTab: PaymentSubTab;
  filters: FilterState;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ subTab, filters }) => {
  const [showDiagram, setShowDiagram] = useState(false);
  const rows = PAYMENT_ROWS_78;

  // Chart data: Payment Method Revenue
  const methodRevenueData = [
    { name: '카카오페이', amount: 1273542750, count: 53696, color: '#facc15' },
    { name: '가상계좌', amount: 953825750, count: 39871, color: '#3b82f6' },
    { name: '네이버페이', amount: 929515500, count: 40295, color: '#10b981' },
    { name: '신용카드', amount: 591381000, count: 24959, color: '#6366f1' }
  ];

  // Refund vs Normal breakdown
  const refundBreakdownData = [
    { name: '정상결제 유지', value: 134276, color: '#2563eb' },
    { name: '전체취소 (100% 환불)', value: 15983, color: '#ef4444' },
    { name: '부분취소 (50% 환불)', value: 7733, color: '#f59e0b' },
    { name: '부분취소 (75% 환불)', value: 29, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-5">
      {/* 4 KPI Summary Cards for Revenue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">총 결제 시도금액</div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
            42억 6,656만원
          </div>
          <div className="mt-1 text-xs text-slate-500">총 158,021건 승인</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">순 응시료 수입액</div>
          <div className="mt-2 text-2xl font-extrabold text-blue-900 tracking-tight">
            37억 4,746만원
          </div>
          <div className="mt-1 text-xs font-semibold text-blue-600">환불액 차감 후 국고 수납액</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">정상결제 유지건수</div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-700 tracking-tight">
            134,276건
          </div>
          <div className="mt-1 text-xs text-slate-500">전체 결제 건의 85.0%</div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500">총 취소/환불액</div>
          <div className="mt-2 text-2xl font-extrabold text-rose-700 tracking-tight">
            5억 1,910만원
          </div>
          <div className="mt-1 text-xs text-rose-600">취소 23,745건 (환불규정 적용)</div>
        </div>
      </div>

      {/* Info Notice Box matching Image 6 */}
      <div className="bg-[#fffbeb] border border-amber-300 rounded-lg p-4 text-xs text-amber-900 leading-relaxed shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold flex items-center gap-1.5 text-amber-950">
            <Info className="w-4 h-4 text-amber-700" />
            안내 및 결제대행업체 정산 참고사항
          </div>
          <button
            type="button"
            onClick={() => setShowDiagram(!showDiagram)}
            className="px-2.5 py-1 text-[11px] font-semibold bg-amber-200 hover:bg-amber-300 text-amber-900 rounded transition-colors flex items-center gap-1"
          >
            <Workflow className="w-3.5 h-3.5" />
            {showDiagram ? '다이어그램 닫기' : '정산 흐름 다이어그램 확인'}
          </button>
        </div>
        <ul className="space-y-1 list-disc list-inside text-[11.5px] text-amber-900/90">
          <li>결제대행업체와 동일한 데이터는 정상결제 항목 입니다.</li>
          <li>결제 확인처리시간으로 인해 결제대행업체와의 통계는 일정시간동안 오차가 생길 수 있습니다.</li>
          <li>부분취소건의 건수는 부분취소횟수이므로 결제대행업체와 맞지 않을 수 있습니다.</li>
          <li>
            표의 타이틀 또는 우측 버튼을 클릭하시면 결제/환불 정산 프로세스 다이어그램을 확인하실 수 있습니다.
          </li>
        </ul>
      </div>

      {/* Flow Diagram (When toggled or clicked) */}
      {showDiagram && (
        <div className="bg-slate-900 text-white p-6 rounded-lg border border-slate-800 shadow-lg animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <div className="flex items-center gap-2">
              <Workflow className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm font-bold text-white">
                한국사능력검정시험 결제·환불 정산 처리 다이어그램
              </h4>
            </div>
            <button
              onClick={() => setShowDiagram(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              ✕ 닫기
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-xs">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center mx-auto mb-2 font-bold">
                1
              </div>
              <div className="font-bold text-slate-200">수험생 접수 및 결제</div>
              <div className="text-slate-400 text-[11px] mt-1">
                신용카드 / 가상계좌 / 카카오페이 / 네이버페이 (수급자 50% 할인 포함)
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center mx-auto mb-2 font-bold">
                2
              </div>
              <div className="font-bold text-slate-200">PG 결제대행사 승인</div>
              <div className="text-slate-400 text-[11px] mt-1">
                실시간 거래승인 및 정산 DB 실시간 동기화
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-amber-900 text-amber-300 flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <div className="font-bold text-slate-200">취소/환불 검증</div>
              <div className="text-slate-400 text-[11px] mt-1">
                마감 전 100% 환불, 마감 후 50%/75% 부분 환불 규정 자동 적용
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center mx-auto mb-2 font-bold">
                4
              </div>
              <div className="font-bold text-slate-200">국고 수납 및 정산 확정</div>
              <div className="text-slate-400 text-[11px] mt-1">
                국사편찬위원회 세입 징수 결의 및 정산대사 최종 완료
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Payment Method Distribution */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-800 mb-2">
            결제수단별 수납액 비중
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            간편결제(카카오·네이버 58.8%) 및 계좌/카드별 점유율
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodRevenueData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 100000000).toFixed(1)}억`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val: number) => [formatCurrency(val), '수납액']} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Refund Status Breakdown */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-800 mb-2">
            결제 및 취소/환불 건수 현황
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            정상 결제 유지(85.0%) vs 접수취소(15.0%) 상태별 건수
          </p>
          <div className="h-56 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={refundBreakdownData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={35}
                >
                  {refundBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${formatNumber(val)}건`, '']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Primary Settlement Table matching Image 6 */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div
          onClick={() => setShowDiagram(!showDiagram)}
          className="px-5 py-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
          title="클릭 시 정산 다이어그램을 확인할 수 있습니다."
        >
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            결제대행업체 결제 및 검정시험 결제 상세 대사표
            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-normal">
              클릭 시 다이어그램 토글
            </span>
          </span>
          <span className="text-[11px] text-slate-500">
            단위: 건수, 원 (KRW)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              {/* Level 1 Header */}
              <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <th rowSpan={3} className="py-2 px-3 border-r border-slate-200 w-28 bg-slate-200/50">
                  결제구분
                </th>
                <th colSpan={6} className="py-2 px-3 border-r border-slate-200 bg-blue-50/50">
                  일반결제
                </th>
                <th colSpan={5} className="py-2 px-3 border-r border-slate-200 bg-emerald-50/50">
                  수급자(50%선할인)
                </th>
                <th rowSpan={3} className="py-2 px-4 w-36 bg-amber-50 text-amber-900 font-bold">
                  응시료수입액
                  <br />
                  (전체)
                </th>
              </tr>

              {/* Level 2 Header */}
              <tr className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200 text-[11px]">
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200">정상결제</th>
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200 text-rose-600">
                  전체취소
                  <br />(100%환불)
                </th>
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200 text-amber-600">
                  부분취소
                  <br />(50%환불)
                </th>
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200 text-purple-600">
                  부분취소
                  <br />(75%환불)
                </th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-slate-200/40">
                  전체결제
                </th>

                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200">정상결제<br />(50%할인)</th>
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200 text-rose-600">
                  전체취소<br />(50%환불)
                </th>
                <th rowSpan={2} className="py-1 px-2 border-r border-slate-200 text-amber-600">
                  부분취소<br />(25%환불)
                </th>
                <th colSpan={2} className="py-1 px-2 border-r border-slate-200 bg-slate-200/40">
                  전체결제
                </th>
              </tr>

              {/* Level 3 Header */}
              <tr className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 text-[10px]">
                <th className="py-1 px-2 border-r border-slate-200">건수</th>
                <th className="py-1 px-2 border-r border-slate-200">금액</th>
                <th className="py-1 px-2 border-r border-slate-200">건수</th>
                <th className="py-1 px-2 border-r border-slate-200">금액</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 text-slate-700">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-800 text-left">
                    <div className="flex items-center justify-between">
                      <span>{r.method}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{r.subType}</span>
                    </div>
                  </td>
                  {/* 일반결제 */}
                  <td className="py-2.5 px-2 border-r border-slate-200">{formatNumber(r.normalCount)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-rose-600">
                    {formatNumber(r.refund100Count)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-amber-600">
                    {formatNumber(r.refund50Count)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-purple-600">
                    {formatNumber(r.refund75Count)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 font-medium">
                    {formatNumber(r.totalGeneralCount)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 font-medium text-right pr-2">
                    {r.totalGeneralAmount ? formatNumber(r.totalGeneralAmount) : '0'}
                  </td>

                  {/* 수급자 */}
                  <td className="py-2.5 px-2 border-r border-slate-200">{formatNumber(r.beneficiaryNormalCount)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-rose-600">
                    {formatNumber(r.beneficiaryRefund100Count)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-amber-600">
                    {formatNumber(r.beneficiaryRefund50Count)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 font-medium">
                    {formatNumber(r.totalBeneficiaryCount)}
                  </td>
                  <td className="py-2.5 px-2 border-r border-slate-200 font-medium text-right pr-2">
                    {r.totalBeneficiaryAmount ? formatNumber(r.totalBeneficiaryAmount) : '0'}
                  </td>

                  {/* 응시료 수입액 */}
                  <td className="py-2.5 px-3 font-bold text-blue-900 text-right bg-amber-50/40">
                    {r.netRevenue ? formatNumber(r.netRevenue) : '0'}
                  </td>
                </tr>
              ))}

              {/* 결제총합 Row matching Image 6 */}
              <tr className="bg-amber-100/70 font-extrabold text-slate-900 border-t-2 border-amber-300">
                <td className="py-3 px-3 border-r border-amber-300 text-center">
                  결제총합
                </td>
                <td className="py-3 px-2 border-r border-amber-300">134,276</td>
                <td className="py-3 px-2 border-r border-amber-300 text-rose-700">15,983</td>
                <td className="py-3 px-2 border-r border-amber-300 text-amber-800">7,733</td>
                <td className="py-3 px-2 border-r border-amber-300 text-purple-800">29</td>
                <td className="py-3 px-2 border-r border-amber-300">158,021</td>
                <td className="py-3 px-2 border-r border-amber-300 text-right pr-2">
                  4,266,567,000
                </td>

                <td className="py-3 px-2 border-r border-amber-300">1,260</td>
                <td className="py-3 px-2 border-r border-amber-300 text-rose-700">143</td>
                <td className="py-3 px-2 border-r border-amber-300 text-amber-800">61</td>
                <td className="py-3 px-2 border-r border-amber-300">1,464</td>
                <td className="py-3 px-2 border-r border-amber-300 text-right pr-2">
                  19,764,000
                </td>

                <td className="py-3 px-3 text-right text-blue-950 font-black bg-amber-200/80">
                  3,747,465,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
