import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Producto} from '../models';
import {PersonaRepository} from './persona.repository';
import {ProductoRepository} from './producto.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id_producto,
  PedidoRelations
> {

  public readonly idpersona: BelongsToAccessor<Persona, typeof Pedido.prototype.id_producto>;

  public readonly pedidoID: HasManyRepositoryFactory<Persona, typeof Pedido.prototype.id_producto>;

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id_producto>;

  public readonly producto: HasOneRepositoryFactory<Producto, typeof Pedido.prototype.id_producto>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Pedido, dataSource);
    this.producto = this.createHasOneRepositoryFactoryFor('producto', productoRepositoryGetter);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.pedidoID = this.createHasManyRepositoryFactoryFor('pedidoID', personaRepositoryGetter,);
    this.registerInclusionResolver('pedidoID', this.pedidoID.inclusionResolver);
    this.idpersona = this.createBelongsToAccessorFor('idpersona', personaRepositoryGetter,);
    this.registerInclusionResolver('idpersona', this.idpersona.inclusionResolver);
  }
}
