import { RoleModel } from "../model/user.js"

export const addRole = async (name) => {
    try {
        const role = new RoleModel({
            name: name
        })
        await role.save()

    }
    catch (error) {
        console.log("something went wrong while adding roles", error)

    }

}