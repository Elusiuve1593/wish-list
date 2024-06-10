import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'wish' })
export class Wish_orm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'json', nullable: false })
  urlLinks: string[];

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ type: 'json', nullable: false })
  categories: string[];

  @Column({ nullable: true })
  image: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  owner: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(wish: Partial<Wish_orm>) {
    Object.assign(this, wish);
  }
}
