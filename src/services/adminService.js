import pkg from 'pg';
const { Pool } = pkg;

// Database connection (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Function to ensure the 'admins' table exists
const ensureAdminsTableExists = async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        mobile_number VARCHAR(15) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        deliverable_pincode TEXT[] NOT NULL, -- Array of pincode
        address TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        pincode VARCHAR(10) NOT NULL
      );
    `);
  };
  

// Create a new admin in the database
const createAdmin = async (admin) => {
  const { mobile_number, full_name, email, deliverable_pincode, address, city, pincode } = admin;
  await ensureAdminsTableExists();

  const result = await pool.query(
    `INSERT INTO admins (mobile_number, full_name, email, deliverable_pincode, address, city, pincode)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [mobile_number, full_name, email, deliverable_pincode, address, city, pincode]
  );

  return result.rows[0];
};

export default { createAdmin };
