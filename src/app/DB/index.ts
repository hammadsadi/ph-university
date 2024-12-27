import config from '../config';
import { USER_ROLE } from '../modules/users/user.constant';
import { User } from '../modules/users/user.model';

const superUser = {
  id: '01',
  email: 'devteamsaadi@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};
const seedSuperAdmin = async () => {
  // Check Super Admin Axist or Not
  const isExistSuperAdmin = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isExistSuperAdmin) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
