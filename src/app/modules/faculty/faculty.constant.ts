import { TBloodGroup, TGender } from './faculty.interface';

export const BloodGroup: TBloodGroup[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];

export const Gender: TGender[] = ['Male', 'Female'];

export const FacujltySearchAbleFileds = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.middleName',
  'name.lastName',
];
