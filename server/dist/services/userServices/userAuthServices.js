import bcrypt from 'bcrypt';
export class userAuthServices {
    validator(data) {
        const { name, email, newPassword, confirmPassword } = data;
        if (!email || !newPassword || !confirmPassword || !name) {
            return { valid: false, message: "Enter credentials..." };
        }
        if (newPassword !== confirmPassword) {
            return { valid: false, message: "Password not matching..." };
        }
        return { valid: true, name, email, password: newPassword };
    }
    async passwordHashing(password) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
}
//# sourceMappingURL=userAuthServices.js.map