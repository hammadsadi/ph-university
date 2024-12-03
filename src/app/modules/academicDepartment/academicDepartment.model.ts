import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


// When Create Academic Department Check Exist or not Before Save Using Pre hooks
academicDepartmentSchema.pre('save', async function(next){
  // Is Exist or not
  const isExistDepartment = await AcademicDepartment.findOne({name:this.name})
  if(isExistDepartment){
    throw new Error('This Academic Department is Already Exist!')
  }
  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
