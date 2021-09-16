import {model, property} from '@loopback/repository';
import {Animal} from '.';

@model({settings: {strict: false}})
export class WildAnimal extends Animal {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  trackingId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WildAnimal>) {
    super(data);
  }
}

export interface WildAnimalRelations {
  // describe navigational properties here
}

export type WildAnimalWithRelations = WildAnimal & WildAnimalRelations;
