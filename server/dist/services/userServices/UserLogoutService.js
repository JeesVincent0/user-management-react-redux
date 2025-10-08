export class UserLogoutService {
    UserRepo;
    hashToken;
    constructor(UserRepo, hashToken) {
        this.UserRepo = UserRepo;
        this.hashToken = hashToken;
    }
    ;
    logoutUser = () => {
        try {
        }
        catch (error) {
            console.log(error);
        }
    };
}
//# sourceMappingURL=UserLogoutService.js.map