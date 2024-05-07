/* istanbul ignore file -- @preserve */
import { api } from "src/app/blitz-server"
import {Client} from 'pg';

//DATABASE_URL_PROD=postgresql://arraial_owner:nea1GMgH9Cdt@ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech/arraial?sslmode=require

export default api(async (req: any, res: any, _ctx:any) => {
  console.log('===>> PRODUCT API CALLED')
  const client = new Client({
    user: 'arraial_owner', 
    host: 'ep-damp-shape-a26djqu0.eu-central-1.aws.neon.tech', 
    database: 'arraial', 
    password: 'nea1GMgH9Cdt',
    ssl: {
      rejectUnauthorized: false,
    }
   });
 
  client.connect() .then(() => { console.log('Connected to PostgreSQL database!'); }) .catch((err: any) => { console.error('Error connecting to the database:', err); });
  
  
  const result = await client.query({
    rowMode: 'array',
    text: 'SELECT * from products;',
  })
  
  res.send(result.rows)
});
