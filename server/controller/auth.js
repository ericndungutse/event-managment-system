import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/userModel.js';
import {
  loginValidationSchema,
  signupValidationSchema,
} from '../validation/authValidations.js';
import { generateJWToken } from '../utils/jwt.js';

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

// ********* Sign up ************
export const signup = async (req, res, next) => {
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
        .json({ message: error.message });
    }

    const { firstName, lastName, email, password } =
      req.body;

    // 2) Create user
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    // 3) Send Successful response
    res.status(201).json({
      message: 'User created successfully.',
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({
        message: `Email (${email}) already in use.`,
      });
    }
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

// ********* Sign in ************
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
        .json({ message: error.message });
    }

    const user = await User.findOne({
      email: email,
    }).select('+password');

    // Check if use does not exist
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    // Verify Password password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: 'Invalid credentials.',
      });
    }

    const signinInfo = signinUser(user);

    res.status(200).json({
      token: signinInfo.token,
      user: signinInfo.user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
