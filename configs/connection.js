const settings = require('./settings')
const {Client} = require('pg')

const ensureDatabaseExists = async () => {
    const client = new Client({
      database: settings.defaultDb,
      port: 5432,
      user: settings.username,
      password: settings.password
    });
    try {
      await client.connect();
      const result = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [settings.database]
      );
      if (result.rowCount === 0) {
        console.log(`Database ${settings.database} not found`);
        await client.query(`CREATE DATABASE ${settings.database}`);
        console.log(`Database "${settings.database}" created successfully!`);
      } else {
        console.log(`Database "${settings.database}" already exists.`);
      }
      await client.end();
    } catch (err) {
      console.log(err);
    }
  };

module.exports = ensureDatabaseExists