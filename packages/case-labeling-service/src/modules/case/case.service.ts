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
    let cases: Case[] = await this.caseRepository.findAll();

    if(!cases?.length) {
    /**
     * For the purposes of this demo, sample data
     * is being retrieved from a static data source (.txt files).
     * This could be achieved with webhooks, for instance,
     * or by calling any api client that would fetch data
     * from another microservice
     *  eg.: await this.apiClient.cases.getNonReviewed();
     */
      const entities = await this.getCasesFromReadModel();

      cases = await this.caseRepository.insertMany(entities);
    }

    const nonReviewedCases = cases.filter(el => !el.isReviewed);

    return GetNonReviewedCasesMapper.toDTO(nonReviewedCases);
  }

  private async getCasesFromReadModel(): Promise<Case[]> {
    const dirPath: string = path.resolve(__dirname, '../../shared/database/assets/cases');
    const jsonData = await utils.parseTxt(dirPath);

    const cases: Case[] = jsonData.map(jsonObj => ({
      code: utils.generateReadableCode({ salt: jsonObj.name }),
      description: jsonObj.content,
      isReviewed: false,
    }));

    return cases;
  }
}

export default CaseService;
