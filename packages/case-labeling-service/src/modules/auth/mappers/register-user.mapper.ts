import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { generateReadableCode } from '../../../shared/utils';
import { RegisterUserDto } from '../dtos/results/register-user.dto';

export class RegisterUserMapper {

  public static toDomain(dto: UserDto): Omit<User, 'tokens'> {
    return {
      code: generateReadableCode(dto.email),
      email: dto.email,
      password: dto.password,
      name: dto.name,
    };
  }

  public static toDTO(entity: User): RegisterUserDto {
    return {
      code: entity.code,
      email: entity.email,
      name: entity.name,
      tokens: entity.tokens,
    };
  }
}
