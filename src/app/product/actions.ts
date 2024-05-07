'use server'


import pg from 'pg';
//import { useEffect } from "react";

//postgresql://arraial_owner:nea1GMgH9Cdt@ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech/arraial?sslmode=require


const connect = async () => {
  const { Client } = pg
  const client = new Client({
    user: 'arraial_owner',
    host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech',
    database: 'arraial',
    password: 'nea1GMgH9Cdt',
    ssl: {
      rejectUnauthorized: false,
    }
  })
  await client.connect();
  console.log('connected')
  return client;
}

export async function get() {
    const client = await connect();
    const res = await client.query('SELECT * FROM PRODUCTS')
    return res.rows;
}
