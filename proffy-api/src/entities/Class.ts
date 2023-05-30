import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'

import User from './User'
import Schedule from './Schedule'

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { array: true })
  subjects: string[]

  @Column('varchar', { length: '13' })
  whatsapp: string

  @Column("varchar")
  bio: string

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number

  @OneToMany(() => Schedule, (schedule) => schedule.class)
  @JoinColumn({ name: 'schedule' })
  schedules: Schedule[]

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('uuid')
  user_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Class
