import jwt from 'jsonwebtoken';

export const verifyJWToken = (token) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY
  );
  return decoded;
};

export const generateJWToken = (userInfo) => {
  const userToken = jwt.sign(
    { userInfo },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '2d' }
  );
  return userToken;
};
