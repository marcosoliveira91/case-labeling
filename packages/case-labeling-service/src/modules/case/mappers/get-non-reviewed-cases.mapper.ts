import { Case } from '../entities/case.entity';
import { GetNonReviewedCasesDto } from '../dtos/results/get-non-reviewed-cases.dto';

export class GetNonReviewedCasesMapper {

  public static toDTO(entity: Case[]): GetNonReviewedCasesDto {
    return {
      cases: entity.map(({ code, description, isReviewed }) => ({
        code,
        description,
        isReviewed,
      })),
    };
  }
}
