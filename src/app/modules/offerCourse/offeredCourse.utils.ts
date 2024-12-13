import { TSchedule } from './offerCourse.interface';

export const hasTimeConflict = (
  assignedSchedule: TSchedule[],
  newSchedule: TSchedule,
) => {
  for (const schedule of assignedSchedule) {
    // Existing Time
    const oldStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const oldEndTime = new Date(`1970-01-01T${schedule.endTime}`);

    // New Time
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    if (newStartTime < oldEndTime && newEndTime > oldStartTime) {
      return true;
    }
  }
  return false;
};
