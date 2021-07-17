import { User } from './user.interface';

export type RegisteredUser = User & { isLoggedIn: boolean };
