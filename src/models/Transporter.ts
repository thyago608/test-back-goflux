import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transporters')
class Transporter{

    @PrimaryGeneratedColumn()
    public id:number;

    @Column()
    name:string;

    @Column()
    doc:string;

    @Column()
    about:string;

    @Column()
    site:string;

    @Column()
    active: boolean;

}


export { Transporter }