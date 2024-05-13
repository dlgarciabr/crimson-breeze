import pg from 'pg';

let client: pg.Client | undefined = undefined;

const connect = async () => {
  const { Client } = pg;
  client = new Client({
    user: 'arraial_owner',
    host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech',
    database: 'arraial',
    password: 'nea1GMgH9Cdt',
    ssl: {
      rejectUnauthorized: false,
    }
  })
  await client.connect();
}

export const getClient = async () => {
  if(!client){
    await connect();
  }
  return client!;
}