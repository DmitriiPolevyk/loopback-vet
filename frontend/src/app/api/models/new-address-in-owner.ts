/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: @loopback/repository-json-schema#Optional<Omit<Address, 'id'>, 'ownerId'>, schemaOptions: { title: 'NewAddressInOwner', exclude: [ 'id' ], optional: [ 'ownerId' ] })
 */
export interface NewAddressInOwner {
  city: string;
  country: string;
  ownerId?: number;
  street: string;
  zipCode: string;

  [key: string]: any;
}
