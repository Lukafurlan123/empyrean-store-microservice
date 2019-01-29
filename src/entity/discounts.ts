import { Entity, Column, PrimaryGeneratedColumn, Long } from "typeorm";

@Entity()
export class Discounts {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar"
    })
    discount_name!: string;

    @Column({
        type: "integer",
        default: 0
    })
    percentage!: number;

    @Column({
        type: "bigint",
        default: 0
    })
    expiry_date!: Long;

    @Column({
        type: "integer",
        default: 0
    })
    max_uses!: number;

    @Column({
        type: "integer",
        default: 0
    })
    uses_left!: number;

}

export default Discounts;