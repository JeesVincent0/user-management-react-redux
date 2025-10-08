import type { IUserInput } from "../../interface/IUpdateProfile.js";
import { sanitizeUser } from "../../mappers/sanitizeUser.js";

export class ProfileUpdateService {
    constructor(private UserRepo: any) { };

    public updateProfile = async (data: IUserInput, id: string, file: any): Promise<{ valid?: boolean; message?: string; statusCode?: number; user?: any }> => {

        const { name, email, houseName, area, city, pin, phone } = data;

        const exitingUser = await this.UserRepo.existingUser(email, id);

        if (exitingUser) return { valid: false, message: "This email is already taken.", statusCode: 400 };

        const updateData: IUserInput = { name, email, address: { houseName, area, city, pin, phone: Number(phone) } };

        if (file) updateData.image = `/uploads/profileImages/${file.filename}`;

        const updateUser = await this.UserRepo.updateProfile(id, updateData);
        if (!updateUser) return { valid: false, message: "Something went wrong.", statusCode: 400 };

        const userObj = sanitizeUser(updateUser);

        return { valid: true, user: userObj }
    }
} 