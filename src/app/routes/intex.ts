import { Router } from 'express';
import { userRoutes } from '../modules/users/user.routes';
import { academicFeacultyRoutes } from '../modules/academicFaculty/academic.feaculty.routes';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { StudentsRoutes } from '../modules/students/student.routes';
import { AdmissionSemesterRoutes } from '../modules/admissionSemester/admission.semester.routes';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { CourseRoutes } from '../modules/courses/course.routes';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semester.registration.routes';
import { OfferCourseRoutes } from '../modules/offerCourse/offerCourse.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { EnrolledCourseRoutes } from '../modules/enrolledCourse/enrolledCourse.routes';

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
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-register',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offer-courses',
    route: OfferCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];


modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
