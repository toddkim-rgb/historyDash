export type MainTabType = 'overview' | 'registration' | 'scoring' | 'payment';

export type RegistrationSubTab = 'regional' | 'center' | 'level' | 'daily';
export type ScoringSubTab = 'results' | 'mean_sd' | 'distribution';
export type PaymentSubTab = 'summary' | 'methods';

export interface FilterState {
  round: string; // e.g. '제78회'
  region: string; // '전체' | '서울' | '경기' | ...
  district: string; // '전체' | '서울1' | '서울2' | ...
  occupation: string; // '전체' | '초중고생' | '대학생' | '취업준비생' | '직장인' | '공무원' | '기타'
  paymentStatus: string; // '전체' | '결제완료' | '환불취소'
  startDate?: string;
  endDate?: string;
  timeFilter?: string;
}

// 1. Registration Types
export interface RegionalStat {
  id: string;
  region: string;
  advanced: number; // 심화
  basic: number; // 기본
  total: number;
  percentage: number; // 전체 대비 비율
  centerCount: number;
}

export interface TestCenterStat {
  id: string;
  district: string;
  centerName: string;
  assignedAdvanced: number;
  assignedBasic: number;
  registeredAdvanced: number;
  registeredBasic: number;
  availableAdvanced: number;
  availableBasic: number;
  rateAdvanced: number; // %
  rateBasic: number; // %
}

// 2. Scoring Types
export interface GradeStat {
  grade: string; // 1급, 2급, 3급, 4급, 5급, 6급
  levelType: '심화' | '기본';
  passCount: number;
  passRate: number; // %
  scoreRange: string;
}

export interface ExamOverallScoring {
  totalApplicants: number; // 지원자수 (128,640)
  absentees: number; // 결시자수 (16,881)
  testTakers: number; // 응시자수 (111,759)
  failedCount: number; // 불합격자수 (43,897)
  passedCount: number; // 합격자수 (67,862)
  overallPassRate: number; // 60.72%

  advanced: {
    applicants: number;
    absentees: number;
    testTakers: number;
    failedCount: number;
    passedCount: number;
    passRate: number;
    maxScoreHolders: number;
    grade1: number;
    grade1Rate: number;
    grade2: number;
    grade2Rate: number;
    grade3: number;
    grade3Rate: number;
  };
  basic: {
    applicants: number;
    absentees: number;
    testTakers: number;
    failedCount: number;
    passedCount: number;
    passRate: number;
    maxScoreHolders: number;
    grade4: number;
    grade4Rate: number;
    grade5: number;
    grade5Rate: number;
    grade6: number;
    grade6Rate: number;
  };
}

export interface MeanSDStat {
  level: '심화' | '기본' | '전체';
  gender: '남' | '여' | '합계' | '총합계';
  takers: number;
  mean: number;
  stdDev: number;
  passCount: number;
  passRate: number;
}

// 3. Payment Types
export interface PaymentRow {
  method: string; // 신용카드, 가상계좌, 카카오페이, 네이버페이, 모바일 소액결제
  subType: '전체' | '심화' | '기본';
  // 일반결제
  normalCount: number;
  refund100Count: number;
  refund50Count: number;
  refund75Count: number;
  totalGeneralCount: number;
  totalGeneralAmount: number;
  // 수급자 (50% 선할인)
  beneficiaryNormalCount: number;
  beneficiaryRefund100Count: number;
  beneficiaryRefund50Count: number;
  totalBeneficiaryCount: number;
  totalBeneficiaryAmount: number;
  // 전체 응시료 수입액
  netRevenue: number;
}
