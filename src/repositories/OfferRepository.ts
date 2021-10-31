import { EntityRepository, Repository } from 'typeorm';
import { Offer } from '../models/Offer';

@EntityRepository(Offer)
class OffersRepository extends Repository<Offer>{}

export { OffersRepository } 