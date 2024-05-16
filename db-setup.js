/* eslint-disable @typescript-eslint/no-var-requires */
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool();

const dbSetup = async () => {
  try {
    const sql = fs.readFileSync(path.resolve(__dirname, 'db-setup.sql')).toString();
    await pool.query(sql);
    console.log('Database setup completed successfully.');
  } catch (err) {
    console.error('Database setup failed:', err);
  } finally {
    await pool.end();
  }
};

dbSetup();