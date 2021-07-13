import User from '../../shared/database/mongoose/models/user.model';
import { Decorators } from './decorators';
import { IocContainer } from '../ioc/container';
import { Server } from '../server';

export class Routes {
  static bootstrap(server: Server, _container: IocContainer): void {
    server.setRoute('post', '/register',
      async (req, reply) => {
        const user = new User(req.body);

        try {
          await user.save();

          // generates the token when user registers
          await user.generateToken();

          void reply.status(201).send({
            status: 'User registration succeeded',
            user: {
              email: user.email,
              name: user.name,
              tokens: user.tokens,
            },
          });
        } catch (error) {
          void reply.status(400).send(error);
        }
      });

    server.setRoute('post', '/login',
      async (req, reply) => {
        await req.user.generateToken();
        const user = req.user;

        void reply.send({
          status: 'User authentication succeeded',
          user: {
            name: user.name,
            email: user.email,
            tokens: user.tokens,
          },
        });
      },
      {
        preHandler: Decorators.verifyCredentials,
      });

    server.setRoute('post', '/logout',
      async (req, reply) => {
        try {
          req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
          });
          const user = await req.user.save();

          void reply.send({
            status: 'User loggout succeeded',
            user: {
              name: user.name,
              email: user.email,
              tokens: user.tokens,
            },
          });
        } catch (error) {
          void reply.status(500).send();
        }
      },
      {
        preHandler: Decorators.verifyJWT,
      });

    server.setRoute('post', '/profile',
      async (req, reply) => {
        void reply.send({
          status: 'Authenticated!',
          user: req.user,
        });
      },
      {
        preHandler: Decorators.verifyJWT,
      }
    );

    server.setRoute('get', '/ping',
      async (req, reply) => {
        void reply.send({ ping: 'pong' });
      },
      {
        preHandler: Decorators.verifyJWT,
      }
    );
  }
}
