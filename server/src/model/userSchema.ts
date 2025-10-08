import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
    name?: string;
    email: string;
    hashPassword: string;
    image?: string;
    address?: {
        houseName?: string;
        area?: string;
        city?: string;
        pin?: string;
        phone?: number;
    };
    isAdmin: boolean;
    refreshTokens: RefreshToken[];
}

interface RefreshToken {
    token: String;
    createdAt?: Date
}

const refreshTokenSchema = new Schema<RefreshToken>(
    {
        token: { type: String },
        createdAt: { type: Date, default: Date.now() },
    }
)

const userSchema = new Schema<IUser>(
    {
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
            default: "",
        },
        address: {
            houseName: { type: String, default: "" },
            area: { type: String, default: "" },
            city: { type: String, default: "" },
            pin: { type: String, default: "" },
            phone: { type: Number, default: 0 },
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true,
        },
        refreshTokens: { type: [refreshTokenSchema], default: [] }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;