class AppConfig {

    // Register:
    public registerUrl = "http://localhost:4000/api/auth/register/";

    // Login:
    public loginUrl = "http://localhost:4000/api/auth/login/";

    // Vacations - users:
    public userVacationsUrl = "http://localhost:4000/api/vacations/";

    // Follow:
    public followUrl = "http://localhost:4000/api/follow/";

    // Vacations - users:
    public unfollowUrl = "http://localhost:4000/api/unfollow/";

    // User Vacations images:
    public userVacationsImages = "http://localhost:4000/api/vacations/images/";

    // Vacations - users:
    public adminVacationsUrl = "http://localhost:4000/api/admin/vacations/";

    // Admin Vacations images:
    public adminVacationsImagesUrl = "http://localhost:4000/api/admin/vacations/images/";

}

const appConfig = new AppConfig();

export default appConfig;