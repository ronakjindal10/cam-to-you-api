const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query(`
  CREATE TABLE selfies (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    face_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`, (err, res) => {
  if (err) throw err;
  console.log('Table is successfully created');
  client.end();
});