import ILogger from '../../shared/logger/logger.interface';
import UserDAO from '../../shared/database/mongoose/models/user.model';
import { User } from './entities/user.entity';

export interface IAuthRepository {
  create(query: Omit<User, 'tokens'>): Promise<User>;
}

class AuthRepository implements IAuthRepository {

  constructor(
    private readonly logger: ILogger,
  ) {}

  async create(query: User): Promise<User> {
    try {
      const user = new UserDAO(query);
      const created = await user.save();

      // generates the token when user registers
      await user.generateToken();

      return created ?? {};
    } catch (error) {
      this.logger.error({
        message: 'Error in AuthRepository.create',
        data: { query },
        error: error as Error,
      });

      throw error;
    }
  }
}

export default AuthRepository;
