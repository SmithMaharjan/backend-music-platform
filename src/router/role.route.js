import express from "express"
import * as RoleController from "../controller/role.js"
export const router = express.Router()
router.post("/addRole", RoleController.addRole)