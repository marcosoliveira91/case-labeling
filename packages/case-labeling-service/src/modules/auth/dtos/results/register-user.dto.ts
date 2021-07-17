import { UserDto } from '../user.dto';

export type RegisterUserDto = Omit<UserDto, 'password'> & { code: string };
