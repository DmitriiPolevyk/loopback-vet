/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Animal, 'id'>, schemaOptions: { title: 'NewAnimal', exclude: [ 'id' ] })
 */
export interface NewAnimal {
  birthday: string;
  speciesId?: number;
  vaccinated?: boolean;

  [key: string]: any;
}
