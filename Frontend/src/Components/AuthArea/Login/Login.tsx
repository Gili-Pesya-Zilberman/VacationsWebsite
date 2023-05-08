import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notify from "../../../Utils/Notify";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            // Extract token from local storage:
            const token = localStorage.getItem("token");
            const decodedToken: any = jwtDecode(token);
            const role = decodedToken.user.role;
            // If user role is "Admin":
            notify.success("Welcome Back");
            if (role === "Admin") {
                navigate("/admin-vacations");
                // If user role is "User":
            } else {
                navigate("/user-vacations");
            }
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (

        <div className="Login containerDiv">

            <h3>Login</h3>

            <form onSubmit={handleSubmit(send)}>

                <label>Email: </label>
                <input type="text" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>


                <button>Login</button>

            </form>

            <h6>
                don't have account?
                <br></br>
                <NavLink to="/register">Register</NavLink>
            </h6>

        </div>

    );
}

export default Login;