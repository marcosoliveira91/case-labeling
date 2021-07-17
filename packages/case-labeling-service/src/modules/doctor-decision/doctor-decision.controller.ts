import { FastifyRequest } from 'fastify';
import { IDecisionService } from './doctor-decision.service';
import { DoctorDecisionDto } from './dtos/doctor-decision.dto';

class DecisionController {
  constructor(
    private readonly doctorDecisionService: IDecisionService,
  ) {}

  createDoctorDecision = (request: FastifyRequest): Promise<DoctorDecisionDto> => {
    const body = request.body as DoctorDecisionDto;

    return this.doctorDecisionService.createDoctorDecision(body);
  }
}

export default DecisionController;
