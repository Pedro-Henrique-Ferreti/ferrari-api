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

        const PAYMENT_SITUATIONS = [
            'Aguardando Pagamento',
            'Cancelado',
            'Pagamento Aprovado',
            'Pagamento Estornado',
            'Em mediação',
            'Enviado',
        ];

        PAYMENT_SITUATIONS.forEach(async (situation) => {
            await queryRunner.query(`INSERT INTO payment_situations(name) VALUES ('${situation}')`);
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payment_situations');
    }

}
