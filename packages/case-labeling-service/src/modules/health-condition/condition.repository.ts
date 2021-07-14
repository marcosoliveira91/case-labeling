import ILogger from '../../shared/logger/logger.interface';
import { Condition } from './entities/condition.entity';
import { HealthConditionDAO } from '../../shared/database/mongoose/models';

export interface IConditionRepository {
  findAll(): Promise<Condition[]>;
  insertMany(query: Condition[]): Promise<Condition[]>;
}

class ConditionRepository implements IConditionRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async findAll(): Promise<Condition[]> {
    try {
      // For the purposes of this demo, sample data is initially retrieved from
      // a static data source, i.e.,csv file, and then saved into the db.
      // This could be also achieved with the help of
      // any webhook endpoint or http calling a 'conditions microservice', for instance
      const conditionsFound: Condition[] = await HealthConditionDAO.find().lean() ?? [];

      return conditionsFound;
    } catch (error) {
      this.logger.error({
        message: 'Error in ConditionRepository.findAll',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }

  async insertMany(query: Condition[]): Promise<Condition[]> {
    try {
      const createdConditions: Condition[] = await HealthConditionDAO.insertMany(query) ?? [];

      return createdConditions;
    } catch (error) {
      this.logger.error({
        message: 'Error in ConditionRepository.insertMany',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default ConditionRepository;
