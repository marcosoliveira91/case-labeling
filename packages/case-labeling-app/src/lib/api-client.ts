import axios from 'axios';
import { DoctorDecision } from '../interfaces/doctor-decision.interface';

export type CreateDecisionQuery = {
  caseCode: string;
  conditionCode: string;
  duration: number;
}

class ApiClient {
  public static async createDecision (query: CreateDecisionQuery): Promise<DoctorDecision> {
    try {
      const url = '/api/doctor-decision';
      const { data } = await axios.post<DoctorDecision>(url, query);

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}


export default ApiClient;
