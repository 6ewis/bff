import express from 'express';
import * as AuthController from './controller/';

const authRoutes = express.Router();

//= ============================
//  Register Flow Express Routes
//= ============================

// 1) user submits registration form
authRoutes.post("/register/submit", AuthController.Register);

// 2) user submits registration verification
authRoutes.post("/register/verify", AuthController.Verify);

//= ============================
//  Login Flow Express Routes
//= ============================

authRoutes.post("/login/submit", AuthController.Login);

//= ============================
//  Reset Flow Express Routes
//= ============================

authRoutes.post("/login/reset", AuthController.RequestForgetPassword);

authRoutes.post("/login/resetCheck", AuthController.CheckPassword);

authRoutes.put("/login/reset", AuthController.ResetPassword);

export default authRoutes;
