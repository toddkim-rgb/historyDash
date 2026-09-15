import React from 'react';
import { Search, RotateCcw, FileSpreadsheet, Calendar, Filter } from 'lucide-react';
import { FilterState } from '../types';
import { EXAM_ROUNDS, REGIONS, DISTRICTS, OCCUPATIONS } from '../data/mockData';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  onExport: () => void;
  showOccupation?: boolean;
  showPaymentStatus?: boolean;
  showDateFilter?: boolean;
  showDistrict?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
  onExport,
  showOccupation = true,
  showPaymentStatus = true,
  showDateFilter = false,
  showDistrict = true
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs mb-5">
      <div className="flex flex-col gap-3">
        {/* Dropdown Filters Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {/* 회차 선택 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              회차
            </label>
            <select
              value={filters.round}
              onChange={(e) => onFilterChange('round', e.target.value)}
              className="w-full h-9 px-2.5 text-xs font-medium border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {EXAM_ROUNDS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* 지역 선택 */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              지역
            </label>
            <select
              value={filters.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
              className="w-full h-9 px-2.5 text-xs font-medium border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              {REGIONS.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* 권역 선택 */}
          {showDistrict && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                권역
              </label>
              <select
                value={filters.district}
                onChange={(e) => onFilterChange('district', e.target.value)}
                className="w-full h-9 px-2.5 text-xs font-medium border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 직업 선택 */}
          {showOccupation && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                직업
              </label>
              <select
                value={filters.occupation}
                onChange={(e) => onFilterChange('occupation', e.target.value)}
                className="w-full h-9 px-2.5 text-xs font-medium border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {OCCUPATIONS.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 결제상태 선택 */}
          {showPaymentStatus && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                결제상태
              </label>
              <select
                value={filters.paymentStatus}
                onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
                className="w-full h-9 px-2.5 text-xs font-medium border border-slate-300 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="전체">전체</option>
                <option value="결제완료">결제완료</option>
                <option value="전체취소">전체취소(환불)</option>
                <option value="부분취소">부분취소</option>
              </select>
            </div>
          )}
        </div>

        {/* Date Time Range Row (matching Image 6 for Payment or detailed views) */}
        {showDateFilter && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                시점조회 (기준일시):
              </span>
              <input
                type="date"
                defaultValue="2026-05-28"
                className="h-8 px-2 text-xs border border-slate-300 rounded bg-white"
              />
              <span className="text-slate-400">~</span>
              <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-slate-700">
                오후 11:59 까지 누적 집계
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium mr-1">빠른 선택:</span>
              <button
                type="button"
                onClick={() => {}}
                className="px-2.5 py-1 rounded bg-blue-900 text-white font-medium hover:bg-blue-800"
              >
                오늘
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              >
                접수마감일
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              >
                시험일
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              조회
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              초기화
            </button>
          </div>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#107c41] hover:bg-[#0b5c30] rounded shadow-2xs transition-colors"
            title="현재 조회된 테이블 데이터를 엑셀(CSV) 형식으로 내려받습니다."
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
            엑셀 다운로드
          </button>
        </div>
      </div>
    </div>
  );
};
