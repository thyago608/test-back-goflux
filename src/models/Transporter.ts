import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('transporters')
class Transporter{

    @PrimaryColumn()
    readonly id:number;

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


    static nextId = 0;

    constructor(){
        if(!this.id){
            this.id = Transporter.nextId++;        
        }
    }

}


export { Transporter }