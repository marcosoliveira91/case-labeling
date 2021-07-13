import { Condition } from '../entities/condition.entity';
import { GetConditionsDto } from '../dtos/results/get-conditions.dto';

export class GetConditionsMapper {

  public static toDTO(entity: Condition[]): GetConditionsDto {
    return {
      conditions: entity.map(condition => condition),
    };
  }
}
