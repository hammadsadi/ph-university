import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academic.semester.routes';

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
