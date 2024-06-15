const { Client } = require('pg');

const client = new Client({
  user: 'postgres',  
  host: 'localhost',
  database: 'company_db',
  password: 'YourPassword',
  port: 5432,
});

client.connect(err => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = client;
