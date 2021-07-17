import * as utils from '../../../shared/utils';
import { CreateDoctorDecisionQueryDto } from '../dtos/queries/create-doctor-decision-query.dto';
import { DoctorDecision } from '../entities/doctor-decision.entity';
import { DoctorDecisionDto } from '../dtos/doctor-decision.dto';

export class CreateDoctorDecisionMapper {

  public static toDomain(dto: CreateDoctorDecisionQueryDto): DoctorDecision {
    return {
      code: utils.generateReadableCode({
        salt: `${dto.doctorCode}:${dto.caseCode}:${dto.conditionCode}`,
      }),
      ...dto,
    };
  }

  public static toDto(entity: DoctorDecision): DoctorDecisionDto {
    return {
      code: entity.code,
      doctorCode: entity.doctorCode,
      caseCode: entity.caseCode,
      conditionCode: entity.conditionCode,
      duration: entity.duration,
    };
  }
}
