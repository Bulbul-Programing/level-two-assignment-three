import express from 'express'
import validateRequest from '../../middleware/validateRequestData'
import { userValidation } from './user.validation'
import { userController } from './user.controller'
import verifyToken from '../../middleware/verifyToken'


const router = express.Router()

router.get('/userRole/:role',verifyToken('admin'), userController.getAllUser)
router.post('/signup', validateRequest(userValidation.createUserValidationSchema), userController.createUser)
router.get('/isExistUser/:email', userController.isExistUser)
router.delete('/deleteUser/:userId', verifyToken('admin'), userController.delateUser)
export const userRouter = router