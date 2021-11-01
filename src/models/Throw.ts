import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('throws')
class Throw{

    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    id_provider:number;
    
    @Column()
    id_offer:number;

    @Column()
    value:number;

    @Column()
    amount:number;
}

export { Throw }
