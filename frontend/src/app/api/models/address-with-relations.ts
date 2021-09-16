/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: AddressWithRelations, schemaOptions: { includeRelations: true })
 */
export interface AddressWithRelations {
  city: string;
  country: string;
  id?: number;
  ownerId?: number;
  street: string;
  zipCode: string;

  [key: string]: any;
}
