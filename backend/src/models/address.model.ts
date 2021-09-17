import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
    },
  })
  street: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
    },    
  })
  city: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
    },      
  })
  country: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {
      dataType: 'character varying',
      dataLength: 100,
    },      
  })
  zipCode: string;

  @property({
    type: 'number',
  })
  ownerId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
