import express from "express";

const router = express.Router();

//Controllers
import { getPosts } from "../../controllers/api/users/Posts/GetPosts/getPosts.controller";
import { createPost } from "../../controllers/api/users/Posts/CreatePost/createPost.controller";

//Middleware
import protectUser from "../../middleware/protectUser";

router.get("/show/", [protectUser], getPosts);
router.post("/create", [protectUser], createPost);

export default router;