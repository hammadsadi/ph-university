/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferCourseServices } from './offerCourse.services';
/**
 * @Description  Create Offer Course
 * @param '
 * @returns Response with data
 * @Method POST
 */

const createOfferCourse = catchAsync(async (req, res, next) => {
  const result = await OfferCourseServices.offerCourseSaveToDB(req.body);
  sendResponse(res, {
    success: true,
    message: 'Offer Course Created Successful',
    data: result,
  });
});

/**
 * @Description  Get Offer Course
 * @param ID
 * @returns Response with data
 * @Method GET
 */

const getOfferCourse = catchAsync(async (req, res, next) => {
  const result = await OfferCourseServices.getAllOfferCourseFromDB(
  );
  sendResponse(res, {
    success: true,
    message: 'Offer Course Get Successful',
    data: result,
  });
});

/**
 * @Description  Updated Offer Course
 * @param ID
 * @returns Response with data
 * @Method PATCH
 */

const updatedOfferCourse = catchAsync(async (req, res, next) => {
  const result = await OfferCourseServices.updatedOfferCourseFromDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    success: true,
    message: 'Offer Course Updated Successful',
    data: result,
  });
});

export const OfferCourseCOntrollers = {
  createOfferCourse,
  updatedOfferCourse,
  getOfferCourse,
};
