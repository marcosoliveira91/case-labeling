import { CaseDto } from '../case.dto';

type NonReviewedCase = CaseDto & {
  isReviewed: boolean;
}

export interface GetNonReviewedCasesDto {
  cases: NonReviewedCase[];
}
