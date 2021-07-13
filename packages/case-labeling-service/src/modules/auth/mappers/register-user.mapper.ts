import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';

export class RegisterUserMapper {

  public static toDomain(dto: UserDto): Omit<User, 'tokens'> {
    return {
      email: dto.email,
      password: dto.password,
      name: dto.name,
    };
  }

  public static toDTO(entity: User): Omit<UserDto, 'password'> {
    return {
      email: entity.email,
      name: entity.name,
      tokens: entity.tokens,
    };
  }
}
