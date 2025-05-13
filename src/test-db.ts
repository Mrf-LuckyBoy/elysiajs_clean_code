import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ DB connected! Result:', rows);
    await connection.end();
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
}

testConnection();
