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

export type TAcademicSemesterName = 'Authum' | 'Summer' | 'Fall';
export type TAcademicSemesterCode = '01' | '02' | '03';
// Model Mian Type
export type TAcademicSemester = {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};


 // Semester Name and Code Type
 export type TAcademicSemesterNameCode = {
    [key: string]: string;
  };