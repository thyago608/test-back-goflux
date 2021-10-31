import { Column, Entity, PrimaryColumn, Timestamp } from 'typeorm';

@Entity("shippers")
class Shipper{

    @PrimaryColumn()
    readonly id: number;

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
    

    static nextId = 0;

    constructor(){
        if(!this.id){
            this.id = Shipper.nextId++;
        }
    }
}

export { Shipper }