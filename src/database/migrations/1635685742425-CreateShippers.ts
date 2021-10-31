import {MigrationInterface, QueryRunner, Table} from "typeorm";

/*
    {
    "id": 1,
    "name": "goFlux Brasil",
    "doc": "60.429.484/0001-10",
    "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
    "active": true,
    "site": "https://goflux.com.br/"
}
*/
export class CreateShippers1635685742425 implements MigrationInterface {

    //Criar tabela
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"shippers",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true,
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"doc",
                        type:"varchar"
                    },
                    {
                        name:"about",
                        type:"varchar"
                    },
                    {
                        name:"site",
                        type:"varchar"
                    },
                    {
                        name:"active",
                        type:'boolean'
                    },
                ]
            })
        )
    }

    //Remover Tabela
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('shippers');
    }

}
