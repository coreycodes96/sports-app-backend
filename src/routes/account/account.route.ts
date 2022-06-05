import express from "express";

const router = express.Router();

//Controllers
import { createAccount } from "../../controllers/account/CreateAccount/createAccount.controller";

//Middleware

router.get("/create_account", [], createAccount);

export default router;
