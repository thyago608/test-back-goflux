import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOffer1635710902596 implements MigrationInterface {

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
                        generationStrategy:"increment"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('offers');
    }

}
