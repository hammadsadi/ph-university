import { Types } from 'mongoose';

export type TGender = 'Male' | 'Female';
export type TBloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

// Admin Name Type
export type TAdminName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

// Present Address Type
export type TAdminPresentAddress = {
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TAdminName;
  gender: TGender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: TAdminPresentAddress;
  permanentAddress: TAdminPresentAddress;
  profileImg?: string;
  isDeleted: boolean;
};
