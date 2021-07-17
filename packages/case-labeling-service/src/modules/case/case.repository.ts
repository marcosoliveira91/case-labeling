import { Case } from './entities/case.entity';
import { CaseDAO } from '../../shared/database/mongoose/models/case.model';
import { CaseNotFoundException } from '../../shared/exceptions';
import { ILogger } from '../../shared/logger/logger';

export interface ICaseRepository {
  findAll(query?: Pick<Case, 'isReviewed'>): Promise<Case[]>;
  insertMany(query: Case[]): Promise<Case[]>;
  update(query: Pick<Case, 'code' | 'isReviewed'>): Promise<Case>;
}

class CaseRepository implements ICaseRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async findAll(query?: Pick<Case, 'isReviewed'>): Promise<Case[]> {
    try {
      const all = await CaseDAO.find({ ...query?.isReviewed && { isReviewed: query.isReviewed }}).lean() ?? [];

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

  async update(query: Pick<Case, 'code' | 'isReviewed'>): Promise<Case> {
    try {
      const { code, isReviewed } = query;
      const filters = { code };
      const toUpdate = { isReviewed };
      const withOptions = {
        new: true,
      };

      const updated = await CaseDAO.findOneAndUpdate(filters, toUpdate, withOptions).lean();

      if(!updated) {
        throw new CaseNotFoundException(code);
      }

      return updated;
    } catch (error) {
      this.logger.error({
        message: 'Error in CaseRepository.update',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default CaseRepository;
