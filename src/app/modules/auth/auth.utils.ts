import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  seret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, seret, {
    expiresIn,
  });
};
