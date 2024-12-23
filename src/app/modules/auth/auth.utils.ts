import jwt, { JwtPayload } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  seret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, seret, {
    expiresIn,
  });
};

export const tokenVerify = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
