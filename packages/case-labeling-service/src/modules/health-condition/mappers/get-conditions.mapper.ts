import { Condition } from '../entities/condition.entity';
import { ConditionDto } from '../dtos/condition.dto';
import { GetConditionsDto } from '../dtos/results/get-conditions.dto';

export class GetConditionsMapper {

  public static toDomain(dto: ConditionDto[]): Condition[] {
    return dto.map(condition => ({
      code: condition.code,
      description: condition.description,
    }));
  }

  public static toDTO(entity: Condition[]): GetConditionsDto {
    return {
      conditions: entity.map(condition => ({
        code: condition.code,
        description: condition.description,
      })),
    };
  }
}
