import { Types } from 'mongoose';

export type StudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
export type PresentAddress = {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contact: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: StudentName;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: PresentAddress;
  permanentAddress: PresentAddress;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  //   admissionSemester;
  isDeleted: boolean;
};
