import { Schema, model } from 'mongoose';

interface HealthCondition {
  code: string;
  description: string;
}

const ConditionSchema = new Schema<HealthCondition>({
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

const HealthConditionDAO = model<HealthCondition>('Condition', ConditionSchema);

export { HealthConditionDAO };
