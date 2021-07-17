import { Schema, model } from 'mongoose';

interface Case {
  code: string;
  description: string;
  isReviewed: boolean;
}

const CaseSchema = new Schema<Case>({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isReviewed: {
    type: Boolean,
  },
});

const CaseDAO = model<Case>('Case', CaseSchema);

export { CaseDAO };
