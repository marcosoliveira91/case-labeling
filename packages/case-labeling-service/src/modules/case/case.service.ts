import * as utils from '../../shared/utils';
import path from 'path';
import { Case } from './entities/case.entity';
import { GetNonReviewedCasesDto } from './dtos/results/get-non-reviewed-cases.dto';
import { GetNonReviewedCasesMapper } from './mappers';
import { ICaseRepository } from './case.repository';

export interface ICaseService {
  getNonReviewedCases(): Promise<GetNonReviewedCasesDto>;
}

class CaseService implements ICaseService {
  constructor(
    private readonly caseRepository: ICaseRepository
  ) {}

  async getNonReviewedCases(): Promise<GetNonReviewedCasesDto> {
    let cases: Case[] = await this.caseRepository.findAll({ isReviewed: false });

    if(!cases?.length) {
      const entities = await this.getCasesFromReadModel();

      cases = await this.caseRepository.insertMany(entities);
    }

    return GetNonReviewedCasesMapper.toDTO(cases);
  }

  private async getCasesFromReadModel(): Promise<Case[]> {
    /**
     * For the purposes of this demo, sample data
     * is being retrieved from a static data source (.txt files).
     * Alternatively, this could be also achieved calling
     * a simple api client that would fetch data
     * from another 'cases microservice'
     *  eg.: await this.apiClient.cases.getNonReviewed();
     */
    const dirPath: string = path.resolve(__dirname, '../../shared/database/assets/cases');
    const jsonData = await utils.parseTxt(dirPath);

    const cases: Case[] = jsonData.map(jsonObj => ({
      code: jsonObj.name,
      description: jsonObj.content,
      isReviewed: false,
    }));

    return cases;
  }
}

export default CaseService;
