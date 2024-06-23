import express from 'express'
import { checkAvailabilityController } from './checkAvailability.controller'

const router = express.Router()

router.get('/', checkAvailabilityController.checkAvailability)

export const checkAvailabilityRouter = router
