import authService from '../services/authService.js';

// Controller function for sending OTP via email
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Call service to generate and send OTP
    const otp = await authService.generateAndSendOtp(email);

    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Controller function for verifying OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Call service to verify the OTP
    const isValid = await authService.verifyOtp(email, otp);

    if (isValid) {
      res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

export default { sendOtp, verifyOtp };
