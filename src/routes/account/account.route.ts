import express from "express";
const router = express.Router();

//Controllers
import { createAccount } from "../../controllers/api/account/CreateAccount/createAccount.controller";
import { login } from "../../controllers/api/account/Login/login.controller";
import { activateAccount } from "../../controllers/api/account/ActivateAccount/activateAccount.controller";
import { resendActivationCode } from "../../controllers/api/account/ActivateAccount/resendActivationCode.controller";
import { forgotPasswordRequest } from "../../controllers/api/account/ForgotPassword/forgotPasswordRequest.controller";
import { forgotPasswordVerify } from "../../controllers/api/account/ForgotPassword/forgotPasswordVerify.controller";
import { forgotPasswordReset } from "../../controllers/api/account/ForgotPassword/forgotPasswordReset.controller";

router.post("/create_account", createAccount);
router.post("/login", login);
router.put("/activate_account", activateAccount);
router.put("/resend_activation_code", resendActivationCode);
router.put("/forgot_password_request", forgotPasswordRequest);
router.put("/forgot_password_verify", forgotPasswordVerify);
router.put("/forgot_password_reset", forgotPasswordReset);

export default router;
