import {
  TAdmissionSemesterCode,
  TAdmissionSemesterName,
  TAdmissionSemesterNameCode,
  TMonths,
} from './admission.semester.interface';

export const admissionSemesterName: TAdmissionSemesterName[] = [
  'Authum',
  'Fall',
  'Summer',
];
export const admissionSemesterCode: TAdmissionSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const admissionSemesterMonts: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Semester Name and Code
export const admissionSemesterNameCode: TAdmissionSemesterNameCode = {
  Authum: '01',
  Summer: '02',
  Fall: '03',
};
