import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { academicFeacultyRoutes } from '../modules/academicFaculty/academic.feaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentsRoutes } from '../modules/students/student.routes';
import { AdmissionSemesterRoutes } from '../modules/admissionSemester/admission.semester.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/admission-semesters',
    route: AdmissionSemesterRoutes,
  },
  {
    path: '/academic-feaculties',
    route: academicFeacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentsRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
