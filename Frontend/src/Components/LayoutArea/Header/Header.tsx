import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/Notify";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {

    // Create navigate:
    const navigate = useNavigate();

    // Navigate home function:
    function home() {
        navigate("/home");
    }

    // Navigate vacations function:
    function vacations() {
        // Extract token:
        const token = localStorage.getItem("token");
        // If there is no token - navigate home:
        if (!token) {
            navigate("/login");
            notify.error("You are not logged in! <br>please log in or register first")
            return;
        }
        // Extract the role from the token: 
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.user.role;
        // If role is "Admin" - navigate to the admin vacations page:
        if (role === "Admin") {
            navigate("/admin-vacations");
            // If role is "User" - navigate to the user vacations page:
        } else if (role === "User") {
            navigate("/user-vacations");
        }
    }


    return (

        <div className="Header">

            <div className="menuButtons">

                {/* Navigate button to home */}
                <button onClick={home}><i className="bi bi-house-fill"></i></button>

                {/* Navigate button to the vacations page based on if the user is logged in or if he is admin or user */}
                <button onClick={vacations}><i className="bi bi-airplane-fill"></i></button>

            </div>

            {/* Auth menu */}
            <AuthMenu />

            {/* Header */}
            <h1>Vacations Website</h1>

        </div>

    );

}

export default Header;