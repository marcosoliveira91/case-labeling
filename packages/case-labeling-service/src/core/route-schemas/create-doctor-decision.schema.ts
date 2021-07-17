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

const bodySchema: JsonSchema = {
  type: 'object',
  required: ['doctorCode', 'caseCode', 'conditionCode', 'duration'],
  properties: {
    doctorCode: { type: 'string' },
    caseCode: { type: 'string' },
    conditionCode: { type: 'string' },
    duration: { type: 'number' },
  },
};

const okResponseSchema: JsonSchema = {
  type: 'object',
  properties: {
    code: { type: 'string' },
    doctorCode: { type: 'string' },
    caseCode: { type: 'string' },
    conditionCode: { type: 'string' },
    duration: { type: 'number' },
  },
};

export const createDoctorDecisionSchema: FastifySchema = {
  tags: ['Doctor Decision'],
  headers: headersSchema,
  body: bodySchema,
  response: {
    200: okResponseSchema,
  },
};
