'use server'

import { getClient } from "@/utils/pgsql";

// import pg from 'pg';

// const connect = async () => {
//   const { Client } = pg
//   const client = new Client({
//     user: 'arraial_owner',
//     host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech',
//     database: 'arraial',
//     password: 'nea1GMgH9Cdt',
//     ssl: {
//       rejectUnauthorized: false,
//     }
//   })
//   await client.connect();
//   console.log('connected')
//   return client;
// }

export async function getProducts() {
    const client = await getClient();
    const res = await client.query('SELECT * FROM PRODUCTS')
    return res.rows as Product[];
}
