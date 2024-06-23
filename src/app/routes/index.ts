import express from 'express';
import { facilityRoute } from '../modules/Facility/Facility.routes';
import { userRouter } from '../modules/user/user.routes';
import { loginRoute } from '../modules/auth/auth.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/facility',
    route: facilityRoute,
  },
  {
    path: '/auth/signup',
    route: userRouter,
  },
  {
    path: '/auth/login',
    route: loginRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
