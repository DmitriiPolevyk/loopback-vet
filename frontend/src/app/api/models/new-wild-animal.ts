/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<WildAnimal, 'id'>, schemaOptions: { title: 'NewWildAnimal', exclude: [ 'id' ] })
 */
export interface NewWildAnimal {
  birthday: string;
  speciesId?: number;
  trackingId: number;
  vaccinated?: boolean;

  [key: string]: any;
}
