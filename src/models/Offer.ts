import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
class Offer{

    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    id_customer:number;

    @Column()
    from:string;

    @Column()
    to:string;
    
    @Column()
    initial_value:number;

    @Column()
    amount:number;

    @Column()
    amount_type:string;
}

export { Offer }
