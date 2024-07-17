import { Column, UpdateDateColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from '@nestjs/class-validator';


@Entity()
export class Product {
  /**
   * this decorator will help to auto generate id for the table.
   */

//    name, description, price, image_url
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.00 })
  @IsNumber()
  price: number;

  @Column({ type: 'varchar', length: 255})
  image_url: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}