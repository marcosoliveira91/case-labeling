import * as utils from '../../shared/utils';
import path from 'path';
import { Condition } from './entities/condition.entity';
import { GetConditionsDto } from './dtos/results/get-conditions.dto';
import { GetConditionsMapper } from './mappers';
import { IConditionRepository } from './condition.repository';

export interface IConditionService {
  getConditions(): Promise<GetConditionsDto>;
}

class ConditionService implements IConditionService {
  constructor(
    private readonly conditionRepository: IConditionRepository
  ) {}

  async getConditions(): Promise<GetConditionsDto> {
    let conditions: Condition[] = await this.conditionRepository.findAll();

    if(!conditions?.length) {
      const entities = await this.getConditionsFromReadModel();

      conditions = await this.conditionRepository.insertMany(entities);
    }

    return GetConditionsMapper.toDTO(conditions);
  }

  private async getConditionsFromReadModel(): Promise<Condition[]> {
    /**
     * For the purposes of this demo, sample data
     * is being retrieved from a static data source (.csv file).
     * Alternatively, this could be also achieved calling
     * a simple api client that would fetch data
     * from another 'conditions microservice'
     * eg.: await this.apiClient.conditions.getAll();
     */
    const filePath: string = path.resolve(__dirname, '../../shared/database/assets/conditions/conditions.csv');
    const conditions = await utils.parseCsv(filePath) as Condition[];

    return conditions;
  }
}

export default ConditionService;
