import express from "express";
import { logInUser, ragisterUser,logout, forgotPassword ,resetPassword, getUserDetail, updateUser, updateUserProfile,getAllUsers,getSingleUser, updateUserRole, deleteUser} from "../controllers/user.js";
import { isAuthantication,authoriseRoles } from "../middlewear/auth.js";
const router = express.Router();
//user
router.route("/ragister").post(ragisterUser);
router.route("/login").post(logInUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthantication,getUserDetail)
router.route("/password/update").put(isAuthantication,updateUser)
router.route("/me/update").put(isAuthantication,updateUserProfile)
//admin
router.route("/admin/users").get(isAuthantication,authoriseRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthantication,authoriseRoles("admin"),getSingleUser).put(isAuthantication,authoriseRoles("admin"),updateUserRole).delete(isAuthantication,authoriseRoles("admin"),deleteUser)


export default router;