import { User } from './user.interface';

export type LoggedInUser = User & { isLoggedIn: boolean };
