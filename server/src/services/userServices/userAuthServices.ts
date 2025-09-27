import bcrypt from 'bcrypt';

export class userAuthServices {
    validator(data: any): { valid: boolean, message?: string, name?: string, email?: string, password?: string } {

        const { name, email, newPassword, confirmPassword } = data;

        if (!email || !newPassword || !confirmPassword || !name) {
            return { valid: false, message: "Enter credentials..." };
        }

        if (newPassword !== confirmPassword) {
            return { valid: false, message: "Password not matching..." };
        }

        return { valid: true, name, email, password: newPassword };
    }

    async passwordHashing(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
}