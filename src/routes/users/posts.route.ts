import express from "express";

const router = express.Router();

//Controllers
import { getPosts } from "../../controllers/api/users/Posts/GetPosts/getPosts.controller";

//Middleware
import protectUser from "../../middleware/protectUser";

router.get("/show/", [protectUser], getPosts);

export default router;