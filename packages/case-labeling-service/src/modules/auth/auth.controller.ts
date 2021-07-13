import { FastifyRequest, FastifyReply } from 'fastify';
import { IAuthService } from './auth.service';
import { UserDto } from './dtos/user.dto';

class AuthController {
  constructor(
    private readonly authService: IAuthService,
  ) {}

  register = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    const query = request.body;
    const registeredUser = await this.authService.register(query as UserDto);

    if(!registeredUser) {
      void reply.code(400);
    }

    void reply.code(201).send({
      user: registeredUser,
    });
  }

  login = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    const authenticatedUser = request.user;

    await authenticatedUser.generateToken();

    void reply.send({
      user: {
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        tokens: authenticatedUser.tokens,
      },
    });
  }

  logout = async (request: FastifyRequest, reply: FastifyReply<any>): Promise<void> => {
    try {
      // TODO: extract to service/repository
      const updatedTokens = request.user.tokens.filter(({ token }) => {
        return token !== request.token;
      });

      request.user.tokens = updatedTokens;

      const loggedOutUser = await request.user.save();

      void reply.send({
        user: {
          name: loggedOutUser.name,
          email: loggedOutUser.email,
          tokens: loggedOutUser.tokens,
        },
      });
    } catch (error) {
      void reply.code(500).send(error);
    }
  }
}

export default AuthController;
