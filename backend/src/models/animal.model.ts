import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Species} from './species.model';

@model({settings: {strict: false}})
export class Animal extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @property({
    type: 'boolean',
    default: false,
  })
  vaccinated?: boolean;

  @belongsTo(() => Species)
  speciesId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Animal>) {
    super(data);
  }
}

export interface AnimalRelations {
  // describe navigational properties here
}

export type AnimalWithRelations = Animal & AnimalRelations;
