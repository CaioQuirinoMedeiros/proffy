import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

import Class from './Class'

@Entity('class_schedule')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('integer')
  week_day: number

  @Column('time')
  from: string

  @Column('time')
  to: string

  @OneToOne(() => Class)
  @JoinColumn({ name: 'class_id' })
  class: Class

  @Column('uuid')
  class_id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'week_day_string' })
  getFullname(): string {
    switch (this.week_day) {
      case 0:
        return 'Domingo'
      case 1:
        return 'Segunda-Feira'
      case 2:
        return 'Terça-Feira'
      case 3:
        return 'Quarta-Feira'
      case 4:
        return 'Quinta-Feira'
      case 5:
        return 'Sexta-Feira'
      case 6:
        return 'Sábado'
      default:
        return ''
    }
  }
}

export default Schedule
