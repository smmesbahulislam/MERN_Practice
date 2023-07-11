import express from "express";
import {
    addRemoveFriend,
    getUser,
    getUserFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read 
router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);


// //update
// router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;