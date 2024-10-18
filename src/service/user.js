import TokenModel from "../model/token.js"
import UserModel, { UserInfoModel } from "../model/user.js"
import jwt from "jsonwebtoken"


export const addUser = async (email, password, role_id) => {
    try {
        const user = new UserModel({
            email: email,
            password: password,
            role_id: role_id
        })
        await user.save()
    }
    catch (error) {
        console.log("something went wrong while adding users", error)

    }
}
export const createProfile = async (username, user_id) => {
    try {
        const user = new UserInfoModel({
            username: username,
            user_id: user_id
        })
        await user.save()


    }
    catch (error) {
        console.log("something went wrong while creating a profile")

    }

}
export const getAllUsers = async () => {
    try {
        const user = await UserModel.find({ isDeleted: false }).populate("role_id");
        const response = await Promise.all(

            user.map(async (data) => {
                const profile = await UserInfoModel.findOne({ user_id: data._id })
                const newData = {
                    ...data.toObject(),
                    profile: profile && profile.toObject()

                }
                return newData



            })
        )

        return response

    }
    catch (error) {
        console.log("something went wrong while getting all the user data", error)

    }
}
export const generateRefreshToken = async (email) => {
    const user = await UserModel.findOne({ "email": email })
    if (!user) {
        console.log("couldnot find the user")
        return;
    }
    const refreshToken = jwt.sign({
        email: user.email
    }, process.env.REFRESH_SECRET_KEY
    )
    return refreshToken
}
export const generateAccessToken = async (email) => {
    const user = await UserModel.findOne({ "email": email })
    if (!user) {
        console.log("couldnot find the user")
        return;
    }
    const accessToken = jwt.sign({
        email: user.email
    }, process.env.ACCESS_SECRET_KEY
    )

    return accessToken
}
export const login = async (email, password) => {
    try {
        // console.log("email form login", email, password);
        const user = await UserModel.findByCredentials(email, password)

        console.log("user", user)

        const refreshToken = await generateRefreshToken(email)
        const storeRefreshToken = new TokenModel({
            token: refreshToken,
            user_id: user._id

        })
        await storeRefreshToken.save()
        const accessToken = await generateAccessToken(email)
        console.log(refreshToken)
        const response = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        return response;

    } catch (error) {
        console.log("error");
        console.log(error);
    }
    return false;

}
export const deleteUser = async (email) => {
    try {
        const user = await UserModel.findOneAndUpdate({ email: email }, { isDeleted: true })
        return user



    }
    catch (error) {
        console.log("something went wrong while deleting the user", error)

    }

}
export const restoreUser = async (email) => {
    try {

        const user = await UserModel.findOneAndUpdate({ email: email }, { isDeleted: false })
        return user
    }
    catch (error) {
        console.log("something went wrong while restoring the user data", error)
    }


}