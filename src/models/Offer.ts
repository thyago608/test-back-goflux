import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('offers')
class Offer{

    @PrimaryGeneratedColumn()
    public id:number;

}


export { Offer }