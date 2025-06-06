import mysql from 'mysql2/promise';

export async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    await connection.query('SELECT 1 + 1 AS result');
    console.log('✅ DB connected!');
    await connection.end();
  } catch (error) {
    console.error('❌ DB connection failed:', error);
    process.exit(1);
  }
}
