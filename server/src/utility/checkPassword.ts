import bcrypt from 'bcrypt';

export const comparePassword = async (passowrd: string, hashedPassword: string) => {
    return bcrypt.compare(passowrd, hashedPassword);
}