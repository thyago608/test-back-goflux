import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOffer1635730222658 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"offers",
                columns:[
                    {
                        name:"id",
                        type:"integer",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:'increment'
                    },
                    {
                        name:"id_customer",
                        type:"integer"
                    },
                    {
                        name:"from",
                        type:"varchar"
                    },
                    {
                        name:"to",
                        type:"varchar"
                    },
                    {
                        name:"initial_value",
                        type:"number"
                    },
                    {
                        name:"amount",
                        type:"number",
                        // isNullable:true
                    },
                    {
                        name:"amount_type",
                        type:"varchar"
                    }
                ],
                foreignKeys:[
                    {
                        name:"FKCustomer",
                        referencedTableName:"shippers",
                        referencedColumnNames:["id"],
                        columnNames:["id_customer"],
                        onDelete:"CASCADE",
                        onUpdate:"CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('offers');
    }
}
