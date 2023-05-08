import { RegisterOptions } from "react-hook-form/dist/types";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: string;

    // First name validation:
    public static firstNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing first name" },
        minLength: { value: 2, message: "First name must be minimum 2 chars" },
        maxLength: { value: 20, message: "First name cant exceeds 20 chars" }
    }

    // Last name validation:
    public static lastNameValidation: RegisterOptions = {
        required: { value: true, message: "Missing last name" },
        minLength: { value: 2, message: "Last name must be minimum 2 chars" },
        maxLength: { value: 20, message: "Last name cant exceeds 20 chars" }
    }

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

export default UserModel;