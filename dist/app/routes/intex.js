"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/users/user.routes");
const academic_feaculty_routes_1 = require("../modules/academicFaculty/academic.feaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_routes_1 = require("../modules/students/student.routes");
const admission_semester_routes_1 = require("../modules/admissionSemester/admission.semester.routes");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const admin_routes_1 = require("../modules/admin/admin.routes");
const course_routes_1 = require("../modules/courses/course.routes");
const semester_registration_routes_1 = require("../modules/semesterRegistration/semester.registration.routes");
const offerCourse_routes_1 = require("../modules/offerCourse/offerCourse.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const enrolledCourse_routes_1 = require("../modules/enrolledCourse/enrolledCourse.routes");
const router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/admission-semesters',
        route: admission_semester_routes_1.AdmissionSemesterRoutes,
    },
    {
        path: '/academic-feaculties',
        route: academic_feaculty_routes_1.academicFeacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routes_1.academicDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.StudentsRoutes,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.FacultyRoutes,
    },
    {
        path: '/admins',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/courses',
        route: course_routes_1.CourseRoutes,
    },
    {
        path: '/semester-register',
        route: semester_registration_routes_1.SemesterRegistrationRoutes,
    },
    {
        path: '/offer-courses',
        route: offerCourse_routes_1.OfferCourseRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/enrolled-courses',
        route: enrolledCourse_routes_1.EnrolledCourseRoutes,
    },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
