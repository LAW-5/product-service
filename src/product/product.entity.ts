import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int' })
  public merchantId: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'int' })
  public stock: number;

  @Column({ type: 'bigint' })
  public price: number;

  @Column({ type: 'varchar', length: 255 })
  public imageUrl: string;

  @Column({ type: 'text' })
  public description: string;
}
