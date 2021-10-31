import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransporter1635702102602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"transporters",
                columns:[
                    {
                        name: "id",
                        type: "integer",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:'increment'
                    },
                    {
                        name: "name",
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
                        type:"boolean"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('transporters');
    }

}
