import { Router } from 'express';
import { CourseControllers } from './course.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidationSchemas } from './course.validation';
import authChecking from '../../middlewares/authChecking';
import { USER_ROLE } from '../users/user.constant';

// Route init
const route = Router();

route.post(
  '/',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidationSchemas.createCourseValidationSchema),
  CourseControllers.createCourse,
);
route.get(
  '/',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  CourseControllers.getAllCourses,
);
route.get(
  '/:id',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  CourseControllers.getSingleCourse,
);
route.put(
  '/:courseId/assign-faculties',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    CourseValidationSchemas.assignCourseWithFacultiesValidationSchema,
  ),
  CourseControllers.assignFacultiesWuthCourse,
);
route.get(
  '/:courseId/get-faculties',
  authChecking(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  CourseControllers.getFacultiesWithCourse,
);
route.delete(
  '/:courseId/remove-faculties',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    CourseValidationSchemas.assignCourseWithFacultiesValidationSchema,
  ),
  CourseControllers.removeFacultiesFromCourse,
);
route.patch(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidationSchemas.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse,
);
route.delete(
  '/:id',
  authChecking(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseControllers.deleteSingleCourse,
);

export const CourseRoutes = route;
