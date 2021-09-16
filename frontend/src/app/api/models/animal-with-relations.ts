/* tslint:disable */
/* eslint-disable */
import { SpeciesWithRelations } from './species-with-relations';

/**
 * (tsType: AnimalWithRelations, schemaOptions: { includeRelations: true })
 */
export interface AnimalWithRelations {
  birthday: string;
  id?: number;
  species?: SpeciesWithRelations;
  speciesId?: number;
  vaccinated?: boolean;

  [key: string]: any;
}
