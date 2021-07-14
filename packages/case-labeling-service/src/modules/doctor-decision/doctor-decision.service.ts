import { DoctorDecisionDto } from './dtos/doctor-decision.dto';
import { IDoctorDecisionRepository } from './doctor-decision.repository';
import { CreateDoctorDecisionQueryDto } from './dtos/queries/create-doctor-decision-query.dto';
import { DoctorDecision } from './entities/doctor-decision.entity';
import { CreateDoctorDecisionMapper } from './mappers';

export interface IDecisionService {
  createDoctorDecision(query: CreateDoctorDecisionQueryDto): Promise<DoctorDecisionDto>;
}

class DecisionService implements IDecisionService {
  constructor(
    private readonly doctorDecisionRepository: IDoctorDecisionRepository
  ) {}

  async createDoctorDecision(queryDto: CreateDoctorDecisionQueryDto): Promise<DoctorDecisionDto> {
    const queryEntity: DoctorDecision = CreateDoctorDecisionMapper.toDomain(queryDto);
    const doctorDecision: DoctorDecision = await this.doctorDecisionRepository.create(queryEntity);

    return CreateDoctorDecisionMapper.toDto(doctorDecision);
  }
}

export default DecisionService;