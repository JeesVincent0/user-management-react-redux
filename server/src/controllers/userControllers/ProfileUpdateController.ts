import type { Request, Response } from "express-serve-static-core"

export class ProfileUpdateController {

    constructor(private profileUpdateService: any) { };

    public profileUpdate = async (req: Request, res: Response) => {
        try {

            const resData: { valid: boolean; message: string; statusCode: number; user: any } = await this.profileUpdateService.updateProfile(req.body, req.user.id, req.file);

            if (!resData.valid) return res.status(Number(resData.statusCode)).json({ message: resData.message, status: 'failed' });

            return res.json({ status: "success", message: "Profile successfully updated.", user: resData.user })

        } catch (error: any) {
            console.log(error)
        }
    }
}