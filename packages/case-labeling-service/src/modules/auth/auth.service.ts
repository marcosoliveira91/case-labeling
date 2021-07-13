import { IAuthRepository } from './auth.repository';
import { RegisterUserMapper } from './mappers';
import { UserDto } from './dtos/user.dto';
import { User } from './entities/user.entity';

export interface IAuthService {
  register(queryDto: UserDto): Promise<Omit<UserDto, 'password'>>;
}

class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository
  ) {}

  async register(queryDto: UserDto): Promise<Omit<UserDto, 'password'>> {
    const queryEntity: Omit<User, 'tokens'> = RegisterUserMapper.toDomain(queryDto);
    const user: User = await this.authRepository.create(queryEntity);

    return RegisterUserMapper.toDTO(user);
  }
}

export default AuthService;
