import config from '../../../../config';
import { AccessTokenException, AuthenticationException } from '../../../exceptions';
import { compare, hash } from 'bcryptjs';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import {
  Document,
  Model,
  model,
  Schema,
} from 'mongoose';

interface IUser {
  code: string;
  name: string;
  email: string;
  password: string;
  tokens: Array<{ token: string }>;
}

export interface IUserDocument extends IUser, Document {
  generateToken(): Promise<string>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByToken(token: string): Promise<IUserDocument>;
  findByCredentials(email: string, password: string): Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

/** Hash the plain text password before saving, if a user is newly created */
UserSchema.pre<IUserDocument>('save', async function save() {
  if (this.isModified('password')) {
    const encryptedPassword = await hash(this.password, 8) ;

    this.password = encryptedPassword;
  }
});

/** Custom method for token generation */
UserSchema.methods.generateToken = async function(){
  const secret: string = config.get().auth.jwt.secret;
  const token: string = sign({ _id: String(this._id) }, secret, { expiresIn: '72h' });

  this.tokens = [...this.tokens, { token }];
  await this.save();

  return token;
};

/** Custom model method to find user by token */
UserSchema.statics.findByToken = async function(token: string) {
  let decodedToken: JwtPayload;

  try {
    if (!token) {
      throw new AccessTokenException('Missing token header');
    }
    const secret: string = config.get().auth.jwt.secret;

    decodedToken = verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AccessTokenException((error as Error).message);
  }

  const user: IUser | null = await User.findOne({
    _id: decodedToken._id as string,
    'tokens.token': token,
  });

  return user;
};

/** Custom model method method to find user by credentiasl */
UserSchema.statics.findByCredentials = async function (email: string, password: string) {
  const user: IUser | null = await User.findOne({ email });

  if (!user) {
    throw new AuthenticationException('Unable to login. Email not found');
  }

  const isMatch = await compare(password, String(user.password));

  if (!isMatch) {
    throw new AuthenticationException('Unable to login. Wrong Password');
  }

  return user;
};

const User = model<IUserDocument, IUserModel>('User', UserSchema);

export default User;
