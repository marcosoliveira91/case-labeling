import ILogger from '../../shared/logger/logger.interface';
import { Case } from './entities/case.entity';
import { CaseDAO } from '../../shared/database/mongoose/models/case.model';

export interface ICaseRepository {
  findAll(query?: Pick<Case, 'isReviewed'>): Promise<Case[]>;
  insertMany(query: Case[]): Promise<Case[]>;
}

class CaseRepository implements ICaseRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async findAll({ isReviewed = false }: Pick<Case, 'isReviewed'>): Promise<Case[]> {
    try {
      const all = await CaseDAO.find({ isReviewed }).lean() ?? [];

      return all;
    } catch (error) {
      this.logger.error({
        message: 'Error in CaseRepository.findAll',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }

  async insertMany(query: Case[]): Promise<Case[]> {
    try {
      const createdConditions: Case[] = await CaseDAO.insertMany(query) ?? [];

      return createdConditions;
    } catch (error) {
      this.logger.error({
        message: 'Error in CaseRepository.insertMany',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default CaseRepository;
