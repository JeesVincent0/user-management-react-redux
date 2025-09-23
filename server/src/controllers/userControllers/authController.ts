import { type Request, type Response } from "express"

const authController = {
    createUser: (req: Request, res: Response) => {
        res.json({ status: "success", error: null, user: {
            name: "Jees Vincent",
            email: "test.jees@gmail.com",
        }})
    }, 
    logout: (req: Request, res: Response) => {
        res.json({ status: "success", error: null, user: null})
    }
}

export default authController;