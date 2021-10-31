import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity("shippers")
class Shipper{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    name: string;
    
    @Column()
    doc: string;

    @Column()
    about: string;
    
    @Column()
    site: string;

    @Column()
    active: boolean;
}

export { Shipper }