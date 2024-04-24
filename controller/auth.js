import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/userModel.js';
import {
  loginValidationSchema,
  signupValidationSchema,
} from '../validation/authValidations.js';

export const generateJWToken = (userInfo) => {
  const userToken = jwt.sign(
    { userInfo },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '2d' }
  );
  return userToken;
};

// Create JWT
const signinUser = (user) => {
  const userInfo = {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
  };

  const token = generateJWToken({
    id: user._id,
    role: user.role,
  });

  return {
    token,
    user: userInfo,
  };
};

// ********* Signup ************
export const signup = async (req, res, next) => {
  const { email } = req.body;
  try {
    // 1) Validate user data
    const { error } = signupValidationSchema.validate(
      req.body,
      {
        errors: { label: 'key', wrap: { label: false } },
      }
    );

    if (error) {
      return res
        .status(400)
        .json({ status: 'fail', message: error.message });
    }

    // 2) Create user
    await User.create({
      ...req.body,
    });

    // 3) Send Successful response
    res.status(201).json({
      status: 'success',
      message: 'User created successfully.',
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'fail',
        message: `Email (${email}) already in use.`,
      });
    }
    res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

export const signin = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Validate user information with joi.
    const { error } = loginValidationSchema.validate(
      req.body,
      {
        errors: { label: 'key', wrap: { label: false } },
      }
    );
    if (error) {
      return res
        .status(400)
        .json({ status: 'fail', message: error.message });
    }

    const user = await User.findOne({
      email: email,
    }).select('+password');

    // Check if use does not exist
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials.',
      });
    }

    // Verify Password password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials.',
      });
    }

    const signinInfo = signinUser(user);

    res.status(200).json({
      status: 'success',
      token: signinInfo.token,
      data: {
        user: signinInfo.user,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
