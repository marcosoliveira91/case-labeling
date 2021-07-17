import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const bodySchema: JsonSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        tokens: { type: 'array' },
      },
    },
  },
};

export const loginSchema: FastifySchema = {
  tags: ['Auth'],
  body: bodySchema,
  response: {
    200: okResponseSchema,
  },
};
