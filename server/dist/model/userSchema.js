import mongoose, { Schema, Document } from "mongoose";
const refreshTokenSchema = new Schema({
    token: { type: String },
    createdAt: { type: Date, default: Date.now() },
});
const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    hashPassword: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    address: {
        houseName: { type: String },
        area: { type: String },
        city: { type: String },
        pic: { type: String },
        phone: { type: Number },
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true,
    },
    refreshTokens: { type: [refreshTokenSchema], default: [] }
}, {
    timestamps: true,
});
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=userSchema.js.map