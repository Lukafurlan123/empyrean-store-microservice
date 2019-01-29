import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar"
    })
    category_name!: string;

}

export default Categories;