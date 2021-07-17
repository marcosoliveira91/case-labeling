import { User } from './user.interface';

export type LoggedOutUser = Omit<User, 'accessToken'> & { isLoggedIn: boolean };
