import userService from '../services/userService.js';

// Controller function for signup
const signup = async (req, res) => {
  try {
    const {
      full_name,
      pan_number,
      date_of_birth,
      gst_number,
      license_registration_number
    } = req.body;

    // Get Cloudinary URLs from the upload
    const pan_file = req.files['pan'] ? req.files['pan'][0].path : null;
    const shop_licence_file = req.files['shop_licence'] ? req.files['shop_licence'][0].path : null;
    const shop_board_file = req.files['shop_board'] ? req.files['shop_board'][0].path : null;

    // Call service to create a new user
    const newUser = await userService.createUser({
      full_name,
      pan_number,
      date_of_birth,
      gst_number,
      license_registration_number,
      pan_file,
      shop_licence_file,
      shop_board_file
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export default { signup };
