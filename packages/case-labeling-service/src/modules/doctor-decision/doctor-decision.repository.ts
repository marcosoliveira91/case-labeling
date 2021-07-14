import { DoctorDecisionDAO } from '../../shared/database/mongoose/models/doctor-decision.model';
import ILogger from '../../shared/logger/logger.interface';
import { DoctorDecision } from './entities/doctor-decision.entity';

export interface IDoctorDecisionRepository {
  create(query: DoctorDecision): Promise<DoctorDecision>;
}

class DoctorDecisionRepository implements IDoctorDecisionRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async create(query: DoctorDecision): Promise<DoctorDecision> {
    try {
      const found = await DoctorDecisionDAO.findOne({ code: query.code }).lean();

      if (found) {
        // TODO: throw new DecisionAlreadyCreatedException(query.code);
        throw new Error('Decision already exists');
      }

      const newDecision = new DoctorDecisionDAO(query);
      const created = await newDecision.save();

      return created ?? {};
    } catch (error) {
      this.logger.error({
        message: 'Error in DoctorDecisionRepository.create',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default DoctorDecisionRepository;
