import ILogger from '../../shared/logger/logger.interface';
import { Condition } from './entities/condition.entity';

export interface IConditionRepository {
  findAll(): Promise<Condition[]>;
}

class ConditionRepository implements IConditionRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async findAll(): Promise<Condition[]> {
    try {
      // TODO: import from file and save into db
      // helper.csvToJson(file);
      // const conditions = [{ cide: 'XPTO', description: 'bla bla' }];
      // ConditionDAO.insertMany(conditions, () => {}));

      // TODO: cache request
      const mockConditions = await Promise.resolve([
        {code: 'A09',
          description :'Infectious gastroenteritis and colitis, unspecified'},
        {code: 'A64',
          description :	'Unspecified sexually transmitted disease'},
        {code: 'B300',
          description :	'Keratoconjunctivitis due to adenovirus'},
        {code: 'B302',
          description :	'Viral pharyngoconjunctivitis'},
        {code: 'B308',
          description :	'Other viral conjunctivitis'},
        {code: 'B309',
          description :	'Viral conjunctivitis, unspecified'},
        {code: 'B373',
          description :	'Candidiasis of vulva and vagina'},
      ] as Condition[]);

      // ConditionDAO.findAll()

      return mockConditions ?? [];
    } catch (error) {
      this.logger.error({
        message: 'Error in AuthRepository.create',
        data: { },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default ConditionRepository;
