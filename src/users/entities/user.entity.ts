import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isSuperuser: boolean;

  @Column({ unique: true })
  email: string;

  @Column()
  telephone: string;

  @Column({ default: false })
  isStaff: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  dateJoined: Date;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // ← superusers não têm tenant
  tenantId: number;
}
