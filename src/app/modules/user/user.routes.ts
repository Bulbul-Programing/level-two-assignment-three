import express from 'express'
import validateRequest from '../../middleware/validateRequestData'
import { userValidation } from './user.validation'
import { userController } from './user.controller'


const router = express.Router()

router.post('/', validateRequest(userValidation.createUserValidationSchema), userController.createUser)
router.get('/isExistUser/:email', userController.isExistUser)
export const userRouter = router