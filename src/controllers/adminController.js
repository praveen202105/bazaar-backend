import adminService from '../services/adminService.js';

// Controller function for admin signup
const signup = async (req, res) => {
  try {
    const { mobile_number, full_name, email, deliverable_pincode, address, city, pincode } = req.body;

    // Call the service to create a new admin
    const newAdmin = await adminService.createAdmin({
      mobile_number,
      full_name,
      email,
      deliverable_pincode,
      address,
      city,
      pincode
    });

    res.status(201).json({
      message: 'Admin created successfully',
      admin: newAdmin
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default { signup };
