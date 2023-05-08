import { RegisterOptions } from "react-hook-form";

class CredentialsModel {

    public email: string;
    public password: string;

    // Email validation:
    public static emailValidation: RegisterOptions = {
        required: { value: true, message: "Missing email" },
        minLength: { value: 6, message: "Email must be minimum 6 chars" },
        maxLength: { value: 50, message: "Email cant exceeds 50 chars" }
    }

    // Password validation:
    public static passwordValidation: RegisterOptions = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password must be minimum 4 chars" },
        maxLength: { value: 30, message: "Password cant exceeds 30 chars" }
    }

}

export default CredentialsModel;