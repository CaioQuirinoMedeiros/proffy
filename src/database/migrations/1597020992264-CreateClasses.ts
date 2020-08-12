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
            name: 'subjects',
            type: 'enum',
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
            ]
          },
          {
            name: 'cost',
            type: 'decimal',
            precision: 10,
            scale: 2
          },
          {
            name: 'bio',
            type: 'text'
          },
          {
            name: 'user_id',
            type: 'uuid'
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
            name: 'ClassUser',
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
