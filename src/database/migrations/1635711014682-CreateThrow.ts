import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateThrow1635711014682 implements MigrationInterface {

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
                        generationStrategy:'increment'
                    },
                ]
            })
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('throws');
    }

}
