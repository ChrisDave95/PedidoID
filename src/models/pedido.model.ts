import {Entity, model, property, belongsTo, hasMany, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';
import {Producto} from './producto.model';

@model()
export class Pedido extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_producto?: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: number;
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @belongsTo(() => Persona, {name: 'persona'})
  id_persona: string;

  @property({
    type: 'string',
  })
  personaId?: string;

  @hasOne(() => Producto)
  producto: Producto;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
