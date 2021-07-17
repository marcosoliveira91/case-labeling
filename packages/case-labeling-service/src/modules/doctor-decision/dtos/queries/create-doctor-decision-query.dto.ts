import { DoctorDecisionDto } from '../doctor-decision.dto';

export type CreateDoctorDecisionQueryDto = Omit<DoctorDecisionDto, 'code'>;
