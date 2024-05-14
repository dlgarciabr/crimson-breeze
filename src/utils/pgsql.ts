import pg from 'pg';

let client: pg.PoolClient | undefined = undefined;

const connect = async () => {
  const { Pool } = pg;
  const pool = new Pool({
    user: 'arraial_owner',
    host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech',
    database: 'arraial',
    password: 'nea1GMgH9Cdt',
    ssl: {
      rejectUnauthorized: false,
    }
  });

  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
  
  client = await pool.connect();

  // client = new Client({
  //   user: 'arraial_owner',
  //   host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech',
  //   database: 'arraial',
  //   password: 'nea1GMgH9Cdt',
  //   ssl: {
  //     rejectUnauthorized: false,
  //   }
  // })
  // await client.connect();
}

export const getClient = async () => {
  if(!client){
    await connect();
  }
  return client!;
}