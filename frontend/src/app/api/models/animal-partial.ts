/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Partial<Animal>, schemaOptions: { partial: true })
 */
export interface AnimalPartial {
  birthday?: string;
  id?: number;
  speciesId?: number;
  vaccinated?: boolean;

  [key: string]: any;
}
