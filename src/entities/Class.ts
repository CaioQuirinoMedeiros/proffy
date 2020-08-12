import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import User from './User'

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('enum', {
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
  })
  subjects: string[]

  @Column()
  bio: string

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: string

  @Column('uuid')
  user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Class
