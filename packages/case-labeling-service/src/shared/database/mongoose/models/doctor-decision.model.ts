import { Schema, model } from 'mongoose';

interface DoctorDecision {
  code: string;
  doctorCode: string;
  caseCode: string;
  conditionCode: string;
  duration: number;
}

const schema = new Schema<DoctorDecision>({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  doctorCode: {
    type: String,
    required: true,
  },
  caseCode: {
    type: String,
    required: true,
  },
  conditionCode: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const DoctorDecisionDAO = model<DoctorDecision>('Decision', schema);

export { DoctorDecisionDAO };
