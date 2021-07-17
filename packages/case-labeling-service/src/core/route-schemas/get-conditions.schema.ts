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
    conditions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          code: { type: 'string' },
          description: { type: 'string' },
        },
      },
    },
  },
};

export const getConditionsSchema: FastifySchema = {
  tags: ['Health Condition'],
  headers: headersSchema,
  response: {
    200: okResponseSchema,
  },
};
