import { Column, Model, Table } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table({
  tableName: 'books',
  timestamps: true,
  paranoid: true,
})
export class Book extends Model {
  @Column({
    primaryKey: true,
    defaultValue: () => uuid(),
  })
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  auther: string;

  @Column
  publishYear: number;

  @Column
  ISBN: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
