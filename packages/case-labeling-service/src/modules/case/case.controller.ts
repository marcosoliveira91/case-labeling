import { ICaseService } from './case.service';
import { GetNonReviewedCasesDto } from './dtos/results/get-non-reviewed-cases.dto';


class CaseController {
  constructor(
    private readonly caseService: ICaseService,
  ) {}

  getNonReviewedCases = (): Promise<GetNonReviewedCasesDto> => {
    return this.caseService.getNonReviewedCases();
  }
}

export default CaseController;
