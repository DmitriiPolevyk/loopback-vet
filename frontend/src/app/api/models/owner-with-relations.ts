/* tslint:disable */
/* eslint-disable */
import { AddressWithRelations } from './address-with-relations';

/**
 * (tsType: OwnerWithRelations, schemaOptions: { includeRelations: true })
 */
export interface OwnerWithRelations {
  address?: AddressWithRelations;
  fullName: string;
  id?: number;

  [key: string]: any;
}
