export class ProfileUpdateController {
    profileUpdateService;
    constructor(profileUpdateService) {
        this.profileUpdateService = profileUpdateService;
    }
    ;
    profileUpdate = async (req, res) => {
        try {
            const resData = await this.profileUpdateService.updateProfile(req.body, req.user.id, req.file);
            if (!resData.valid)
                return res.status(Number(resData.statusCode)).json({ message: resData.message, status: 'failed' });
            return res.json({ status: "success", message: "Profile successfully updated.", user: resData.user });
        }
        catch (error) {
            console.log(error);
        }
    };
}
//# sourceMappingURL=ProfileUpdateController.js.map