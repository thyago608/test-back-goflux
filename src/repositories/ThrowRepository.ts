import { EntityRepository, Repository } from 'typeorm';
import { Throw } from '../models/Throw';

@EntityRepository(Throw)
class ThrowsRepository extends Repository<Throw>{

}

export { ThrowsRepository }