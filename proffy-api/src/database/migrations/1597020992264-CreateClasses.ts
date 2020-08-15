import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClasses1597020992264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'whatsapp',
            type: 'varchar(13)',
            isNullable: false
          },
          {
            name: 'subjects',
            type: 'varchar',
            isArray: true,
            enum: [
              'matematica',
              'fisica',
              'quimica',
              'portugues',
              'literatura',
              'historia',
              'geografia',
              'filosofia',
              'sociologia',
              'musica',
              'artes_cenicas',
              'artes_visuaus',
              'biologia',
              'redacao',
              'ingles',
              'espanhol'
            ],
            isNullable: false
          },
          {
            name: 'cost',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: false
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'Class',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes')
  }
}
