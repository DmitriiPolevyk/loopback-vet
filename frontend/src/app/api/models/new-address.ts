/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Address, 'id'>, schemaOptions: { title: 'NewAddress', exclude: [ 'id' ] })
 */
export interface NewAddress {
  city: string;
  country: string;
  ownerId?: number;
  street: string;
  zipCode: string;

  [key: string]: any;
}
