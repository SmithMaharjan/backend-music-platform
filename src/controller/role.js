import * as RoleService from "../service/role.js"
export const addRole = async (req, res) => {
    const { name } = req.body
    const response = await RoleService.addRole(name)
    res.status(200).json({ message: "role added" })

}
