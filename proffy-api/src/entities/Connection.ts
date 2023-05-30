import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'

import User from './User'

@Entity('connections')
class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('uuid')
  user_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User

  @Column('uuid')
  teacher_id: string

  @CreateDateColumn()
  created_at: Date
}

export default Connection
