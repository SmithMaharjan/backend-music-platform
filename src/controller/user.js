import TokenModel from "../model/token.js"
import * as UserService from "../service/user.js"

export const addUser = async (req, res) => {
    const { email, password, role_id } = req.body
    const response = await UserService.addUser(email, password, role_id)
    res.status(200).json({ message: "new user created" })
}
export const createProfile = async (req, res) => {
    const { username, user_id } = req.body
    const response = await UserService.createProfile(username, user_id)
    res.status(200).json({ message: "profile created" })

}
export const getAllUsers = async (req, res) => {
    const response = await UserService.getAllUsers()
    res.status(200).json({ message: "all user data", datas: response })
}
export const login = async (req, res) => {
    const { email, password } = req.body
    const response = await UserService.login(email, password)
    console.log("response", response)
    if (!response) {
        return res.status(401).json({ message: "log in failed" })
    }


    return res.status(200).json({ message: "login succesfull", refeshToken: response["refreshToken"], accessToken: response["accessToken"] })
}
export const deleteUser = async (req, res) => {
    const { email } = req.body
    const user = await UserService.deleteUser(email)
    res.status(200).json({ success: true, message: "user deleted" })

}
export const restoreUser = async (req, res) => {
    const { email } = req.body
    const response = await UserService.restoreUser(email)
    res.status(200).json({ success: true, message: "user data restored" })

}