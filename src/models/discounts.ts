import { getConnection, Connection } from 'typeorm';
import Discounts from '../entity/discounts';

export async function selectOneDiscount(discountCode: string) : Promise<Discounts> {
  try {
    const connection : Connection = await getConnection();
    const timestamp : number = Math.floor(Date.now() / 1000);
    const discount : Discounts | undefined = await connection
      .createQueryBuilder()
      .select('discounts')
      .from(Discounts, 'discounts')
      .where('discount_name = :discount_name AND expiry_date > :timestamp AND uses_left > 0', { discount_name: discountCode, timestamp: timestamp })
      .getOne();

    if(discount === undefined) {
      throw new Error();
    } else {
      return discount;
    }
  } catch {
    throw new Error();
  }
}

export async function selectOneDiscountWithoutRequirements(discountCode: string) : Promise<Discounts> {
  try {
    const connection : Connection = await getConnection();
    const discount : Discounts | undefined = await connection
      .createQueryBuilder()
      .select('discounts')
      .from(Discounts, 'discounts')
      .where('discount_name = :discount_name', { discount_name: discountCode })
      .getOne();

    if(discount === undefined) {
      throw new Error();
    } else {
      return discount;
    }
  } catch {
    throw new Error();
  }
}