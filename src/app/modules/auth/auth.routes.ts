import express from 'express';
import validateRequest from '../../middleware/validateRequestData';
import { loginValidation } from './auth.validation';
import { loginController } from './auth.controller';


const router = express.Router()

router.post('/login', validateRequest(loginValidation.loginValidationSchema), loginController.loginUser)
router.get('/userData/:email', loginController.getUserData)

export const loginRoute = router