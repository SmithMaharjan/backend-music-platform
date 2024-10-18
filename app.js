import express from "express"
import { router as RoleRouter } from "./src/router/role.route.js"
import { router as UserRouter } from "./src/router/user.route.js"
const app = express()
app.use(express.json())
app.use("/api", RoleRouter)
app.use("/api", UserRouter)
export default app