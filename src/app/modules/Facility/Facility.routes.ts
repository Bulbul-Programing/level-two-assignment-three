import express from 'express'
import validateRequest from '../../middleware/validateRequestData'
import { facilityValidation } from './Facility.validataion'
import { facilityController } from './Facility.controller'
import verifyToken from '../../middleware/verifyToken'

const router= express.Router()
router.get('/', facilityController.getAllFacility)
router.post('/',verifyToken('admin'), validateRequest(facilityValidation.createFacilityValidationSchema), facilityController.createFacility)
router.patch('/:facilityId', verifyToken('admin'), validateRequest(facilityValidation.updateFacilityValidationSchema), facilityController.updateFacility)
router.delete('/:facilityId', verifyToken('admin'), facilityController.deleteFacility)

export const facilityRoute = router

