import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        // Listen to AuthState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

    }, []);

    // Logout:
    function logout(): void {
        authService.logout();
    }

    return (

        <div className="AuthMenu">

            {/* if user is not logged in */}
            {!user && <>

                <span>Hello Guest | </span>

                <NavLink to="/login">Login</NavLink>

                <span> | </span>

                <NavLink to="/register">Register</NavLink>

            </>}

            {/* if user is logged in */}
            {user && <>

                <span>Hello {user.firstName} {user.lastName} | </span>

                <NavLink to="/home" onClick={logout}>Logout</NavLink>

            </>}

        </div>

    );
}

export default AuthMenu;