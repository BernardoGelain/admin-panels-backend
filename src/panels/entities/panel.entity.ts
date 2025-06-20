import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity('panels')
export class Panel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  groupId?: number;

  @Column({ nullable: true })
  tenantId: number;

  @ManyToOne(() => Location, { cascade: true, eager: true })
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column()
  locationId: number;

  @Column({ default: false })
  online: boolean;
}
