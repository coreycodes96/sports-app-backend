import express from "express";
const router = express.Router();

//Controllers
import { createAccount } from "../../controllers/api/account/CreateAccount/createAccount.controller";
import { login } from "../../controllers/api/account/Login/login.controller";
import { activateAccount } from "../../controllers/api/account/ActivateAccount/activateAccount.controller";

router.post("/create_account", createAccount);
router.post("/login", login);
router.put("/activate_account", activateAccount);

export default router;
