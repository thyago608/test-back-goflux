import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('throws')
class Throw{

    @PrimaryGeneratedColumn()
    public id:number;

}

export { Throw }