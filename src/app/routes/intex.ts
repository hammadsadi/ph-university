import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academic.semester.routes';
import { academicFeacultyRoutes } from '../modules/academicFaculty/academic.feaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoutes,
  },
  {
    path: '/academic-feaculties',
    route: academicFeacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
