import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateShippers1635685742425 implements MigrationInterface {

    //Criar tabela
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"shippers",
                columns:[
                    {
                        name:"id",
                        type:"integer",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:'increment'
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
