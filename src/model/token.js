import mongoose, { Schema } from "mongoose";
const TokenSchema = new Schema({
    token: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: "User" }
})

const TokenModel = mongoose.model("Token", TokenSchema)
export default TokenModel