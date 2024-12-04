export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAdmissionSemesterName = 'Authum' | 'Summer' | 'Fall';
export type TAdmissionSemesterCode = '01' | '02' | '03';
// Model Mian Type
export type TAdmissionSemester = {
  name: TAdmissionSemesterName;
  code: TAdmissionSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

// Semester Name and Code Type
export type TAdmissionSemesterNameCode = {
  [key: string]: string;
};
