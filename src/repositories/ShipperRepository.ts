import { EntityRepository, Repository } from 'typeorm';
import { Shipper } from '../models/Shipper';

@EntityRepository(Shipper)
class ShippersRepository extends Repository<Shipper>{

}

export { ShippersRepository }