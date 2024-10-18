import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcryptjs"
const RoleSchema = new Schema({
    name: { type: String, required: true },
})

const UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, ref: "Role" },
    isDeleted: { type: Boolean, default: false }
})
const UserInfoSchema = new Schema({
    username: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User" }
})

UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email: email })
    if (!user) {
        console.log("user not found")
        return
    }
    const validate = await bcrypt.compare(password, user.password)
    if (!validate) {
        console.log("login failed")
    }

    return user

}

UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

})
const UserModel = mongoose.model("User", UserSchema)
export const RoleModel = mongoose.model("Role", RoleSchema)
export const UserInfoModel = mongoose.model("UserInfo", UserInfoSchema)

export default UserModel