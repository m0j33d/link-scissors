import { Router } from 'express';
import asyncWrapper from '../error/error-handler';
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import ValidateAuthRoutes from '../middleware/auth.validation';

const router = Router();

router.post("/register", ValidateAuthRoutes.signUp, asyncWrapper(signUp));
router.post("/login", ValidateAuthRoutes.signIn, asyncWrapper(signIn));
router.post("/forgotPassword", asyncWrapper(forgotPassword));
router.patch("/resetPassword/:token", asyncWrapper(resetPassword));

export { router as AuthRoutes };