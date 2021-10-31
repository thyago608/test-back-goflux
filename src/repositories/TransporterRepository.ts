import { EntityRepository, Repository } from 'typeorm';
import { Transporter } from '../models/Transporter';

@EntityRepository(Transporter)
class TransportersRepository extends Repository<Transporter>{

}

export { TransportersRepository }