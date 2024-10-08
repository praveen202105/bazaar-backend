// import { v4 as uuidv4 } from 'uuid';
import transporter from '../config/nodemailer.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Function to create the 'otps' table if it does not exist
const createTableIfNotExists = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS otps (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      otp VARCHAR(6) NOT NULL,
      created_at TIMESTAMP NOT NULL
    );
  `;
  await pool.query(createTableQuery);
};

// Call the function to create the table if it doesn't exist


// Function to generate and send OTP
const generateAndSendOtp = async (email) => {
    await createTableIfNotExists();
  // Generate a random OTP (6 digits)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the OTP in the database
  await pool.query(
    `INSERT INTO otps (email, otp, created_at) VALUES ($1, $2, NOW()) 
    ON CONFLICT (email) DO UPDATE SET otp = $2, created_at = NOW()`,
    [email, otp]
  );

  // Send OTP email
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`
  };

  await transporter.sendMail(mailOptions);

  return otp; // Returning for testing purposes (in production, you would not return the OTP)
};

// Function to verify OTP
const verifyOtp = async (email, otp) => {
  const result = await pool.query(
    `SELECT otp, created_at FROM otps WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    return false; // OTP not found
  }

  const storedOtp = result.rows[0].otp;
  const createdAt = result.rows[0].created_at;

  // Check if OTP matches and if it's within a valid time window (e.g., 10 minutes)
  const isValid = storedOtp === otp && (new Date() - new Date(createdAt)) < 10 * 60 * 1000;

  return isValid;
};

export default { generateAndSendOtp, verifyOtp };
