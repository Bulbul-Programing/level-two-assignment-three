import express from 'express'
import validateRequest from '../../middleware/validateRequestData'
import { facilityValidation } from './Facility.validataion'
import { facilityController } from './Facility.controller'
import verifyToken from '../../middleware/verifyToken'

const router= express.Router()

router.post('/',verifyToken('admin'), validateRequest(facilityValidation.createFacilityValidationSchema), facilityController.createFacility)
router.patch('/:facilityId', verifyToken('admin'), validateRequest(facilityValidation.updateFacilityValidationSchema), facilityController.updateFacility)

export const facilityRoute = router

