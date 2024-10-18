import express from "express"
import * as UserController from "../controller/user.js"
export const router = express.Router()
router.post("/addUser", UserController.addUser)
router.post("/createProfile", UserController.createProfile)
router.get("/getAllUsers", UserController.getAllUsers)
router.post("/login", UserController.login)
router.patch("/deleteUser", UserController.deleteUser)
router.patch("/restoreUser", UserController.restoreUser)