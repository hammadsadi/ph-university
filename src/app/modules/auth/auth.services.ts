import { TLogin } from './auth.interface';

/**
 *@Description Login User
 @Method POST
 */
const userLogin = async (payload: TLogin) => {
  console.log(payload);
  return '';
};

export const AuthServices = {
  userLogin,
};
