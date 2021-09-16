/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Pet, 'id'>, schemaOptions: { title: 'NewPet', exclude: [ 'id' ] })
 */
export interface NewPet {
  birthday: string;
  ownerId?: number;
  speciesId?: number;
  vaccinated?: boolean;

  [key: string]: any;
}
