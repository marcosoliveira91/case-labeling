import { FastifySchema } from 'fastify/types/schema';
import { JSONSchema7 as JsonSchema } from 'json-schema';
import 'fastify-swagger';

const headersSchema: JsonSchema = {
  type: 'object',
  required: ['Authorization'],
  properties: {
    'Authorization': {
      type: 'string',
      description: 'Authorization Bearer Token',
      examples: ['Bearer <ACCESS_TOKEN>'] },
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

export const logoutSchema: FastifySchema = {
  tags: ['Auth'],
  headers: headersSchema,
  response: {
    200: okResponseSchema,
  },
};
