import { NextFunction, Request, Response, Router } from 'express';
import { userControllers } from './user.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from '../students/student.validation';
import { FacultyValidationSchemas } from '../faculty/faculty.validation';
import { AdminValidationSchemas } from '../admin/admin.validation';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from './user.constant';
import { UserValidationSchemas } from './user.validation';
import { uploadMulter } from '../../utils/uploadImageToCloudinary';

// Init Routes
const router = Router();

// Create Student Route
router.post(
  '/create-student',
  authChecking(USER_ROLE.admin),
  uploadMulter.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(studentValidationSchemas.createValidationStudentSchema),
  userControllers.userCreate,
);
// Create Faculty Route
router.post(
  '/create-faculty',
  authChecking(USER_ROLE.admin),
  uploadMulter.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(FacultyValidationSchemas.createFacultyValidationSchema),
  userControllers.facultyCreate,
);
// Create Admin Route
router.post(
  '/create-admin',
  // authChecking(USER_ROLE.admin),
  uploadMulter.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(AdminValidationSchemas.createValidationAdminSchema),
  userControllers.adminCreate,
);

// Update User Status
router.patch(
  '/change-status/:id',
  authChecking(USER_ROLE.admin),
  validateRequest(UserValidationSchemas.userStatusChangeValidationSchema),
  userControllers.updateStatus,
);

// Create Faculty Route
router.get(
  '/me',
  authChecking(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  userControllers.getMe,
);

export const userRoutes = router;
