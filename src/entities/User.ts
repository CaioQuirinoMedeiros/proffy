import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import uploadConfig from '../config/upload'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'fullName' })
  getFullname(): string | null {
    return `${this.firstName} ${this.lastName}`
  }

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return this.avatar

    return `https://${uploadConfig.awsBucketName}.s3.amazonaws.com/${this.avatar}`
  }
}

export default User
