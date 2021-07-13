import { IConditionService } from './condition.service';
import { GetConditionsDto } from './dtos/results/get-conditions.dto';


class ConditionController {
  constructor(
    private readonly conditionService: IConditionService,
  ) {}

  getConditions = async (): Promise<GetConditionsDto> => {
    return this.conditionService.getConditions();
  }
}

export default ConditionController;
