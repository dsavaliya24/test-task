import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'author',
  timestamps: true,
  paranoid: true,
})
export class Author extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  auther: string;

  @Column
  name: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}
