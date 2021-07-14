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
    const conditions: Condition[] = await this.conditionRepository.findAll();

    return GetConditionsMapper.toDTO(conditions);
  }
}

export default ConditionService;
