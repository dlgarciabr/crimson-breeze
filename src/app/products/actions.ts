'use server'

import { getClient } from "@/utils/pgsql";

export const getProducts = async (available = true): Promise<Product[]> => {
  const client = await getClient();
  const query = {
    text: 'SELECT * FROM PRODUCTS WHERE SOLD_OUT = $1',
    values: [available ? 'f': 't'],
  }
  const res = await client.query(query);

  return res.rows.map(row => ({
    productId: row.product_id,
    description: row.description,
    price: row.price,
    available: !row.sold_out,
    visible: row.visible
  }));
}