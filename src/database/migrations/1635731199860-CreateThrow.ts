import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateThrow1635731199860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"throws",
                columns:[
                    {
                        name:"id",
                        type:"integer",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"id_provider",
                        type:"integer",
                    },
                    {
                        name:"id_offer",
                        type:"integer"
                    },
                    {
                        name:"value",
                        type:"number"
                    },
                    {
                        name:"amount",
                        type:"number"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKProvider",
                        referencedTableName:"shippers",
                        referencedColumnNames:["id"],
                        columnNames:["id_provider"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    },
                    {
                        name:"FKOffer",
                        referencedTableName:"offers",
                        referencedColumnNames:["id"],
                        columnNames:["id_offer"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('throws');
    }

}
