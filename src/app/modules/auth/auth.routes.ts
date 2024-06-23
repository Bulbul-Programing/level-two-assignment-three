import express from 'express';
import validateRequest from '../../middleware/validateRequestData';
import { loginValidation } from './auth.validation';
import { loginController } from './auth.controller';


const router = express.Router()

router.post('/', validateRequest(loginValidation.loginValidationSchema), loginController.loginUser)

export const loginRoute = router