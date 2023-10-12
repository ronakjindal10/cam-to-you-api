const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const createPhotosTable = `
  CREATE TABLE IF NOT EXISTS photos (
    id SERIAL PRIMARY KEY,
    photographer_id INT NOT NULL,
    s3_key VARCHAR(255) NOT NULL,
    rekognition_index VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

client.query(createPhotosTable, (err, res) => {
  if (err) throw err;
  console.log('Table is successfully created');
  client.end();
});