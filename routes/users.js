import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subcribe a user
router.put("/sub/:id", verifyToken, subscribe);
//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);
//like a video
router.post("/like/:videoId", verifyToken, like);

//dislike a video
router.post("/dislike/:videoId", verifyToken, dislike);

export default router;
