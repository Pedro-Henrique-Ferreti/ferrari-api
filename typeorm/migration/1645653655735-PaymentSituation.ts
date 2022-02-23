import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnCreatedAt, columnId, columnUpdatedAt } from "../columns";

export class PaymentSituation1645653655735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payment_situations',
            columns: [
                columnId,
                {
                    name: 'name',
                    type: 'varchar',
                    length: '45',
                    isNullable: false,
                },
                columnCreatedAt,
                columnUpdatedAt,
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment_situations');
    }

}
