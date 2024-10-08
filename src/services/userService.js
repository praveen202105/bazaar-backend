import pkg from 'pg';
const { Pool } = pkg;

// Database connection (PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


// Create 'users' table if it doesn't exist
const createUsersTable = async () => {
    await pool.query(`
     CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      pan_number VARCHAR(15) NOT NULL,
      date_of_birth DATE NOT NULL,
      gst_number VARCHAR(15) NOT NULL,
      license_registration_number VARCHAR(20) NOT NULL,
      pan_file TEXT,
      shop_licence_file TEXT,
      shop_board_file TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  };
  
  // Ensure the table is created before any query
// Create a new user in the database
const createUser = async (user) => {
    console.log("dfgh",user);
     // Create the table if it does not exist
     await createUsersTable();

  const { 
    full_name, pan_number, date_of_birth, gst_number, 
    license_registration_number, pan_file, shop_licence_file, shop_board_file 
  } = user;

  const result = await pool.query(
    `INSERT INTO users (full_name, pan_number, date_of_birth, gst_number, license_registration_number, pan_file, shop_licence_file, shop_board_file)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [full_name, pan_number, date_of_birth, gst_number, license_registration_number, pan_file, shop_licence_file, shop_board_file]
  );

  return result.rows[0];
};



export default { createUser };
