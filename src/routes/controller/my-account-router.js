import express from "express";

import { User } from "../../schema/User.js";
import { isCurrentUser } from "../../middlewares/authentication-middleware.js";

const router = express.Router();

router.get("/", isCurrentUser, async (request, response) => {
  const user = await User.findById(request.session.userID);
  response.status(200).json(user);
});



export default router;