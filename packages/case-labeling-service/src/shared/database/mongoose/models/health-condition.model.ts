import { Schema, model } from 'mongoose';

interface HealthCondition {
  code: string;
  description: string;
}

const schema = new Schema<HealthCondition>({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const HealthConditionDAO = model<HealthCondition>('HealthCondition', schema);

export { HealthConditionDAO };
