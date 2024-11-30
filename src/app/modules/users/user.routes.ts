import { Router } from 'express';
import { userControllers } from './user.controllers';

// Init Routes
const router = Router();

// Create Student Route
router.post('/users/create-student', userControllers.userCreate);

export const userRoutes = router;
