import { Date, Types } from 'mongoose';

// User Name Type
export type TFacultytName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

// Present Address Type
export type TPresentAddress = {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};
// Blood Group Type
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

// Genter Type
export type TGender = 'Male' | 'Female';
// Main Type
export type TFaculty = {
  id: string;
  password: string;
  user: Types.ObjectId;
  designation: string;
  name: TFacultytName;
  gender: TGender;
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: TBloodGroup;
  presentAddress: TPresentAddress;
  permanentAddress: TPresentAddress;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
