import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Products {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar'
  })
  name!: string;

  @Column({
    type: 'varchar'
  })
  description!: string;

  @Column({
    type: 'int'
  })
  category!: number;

  @Column({
    type: 'int'
  })
  price!: number;

  @Column({
    type: 'varchar'
  })
  image!: string;

}

export default Products;