/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

/**
 * @Description  Create Offer Course
 * @param '
 * @returns Response with data
 * @Method POST
 */

import { OfferCourseServices } from './offerCourse.services';

const createOfferCourse = catchAsync(async (req, res, next) => {
  const result = await OfferCourseServices.offerCourseSaveToDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Offer Course Created Successful',
    data: result,
  });
});

export const OfferCourseCOntrollers = {
  createOfferCourse,
};
