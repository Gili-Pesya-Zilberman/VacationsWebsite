import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    // Validation Schema:
    public static validationSchema = Joi.object({
        userId: Joi.number().forbidden(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().email({ tlds: { allow: false } })
            .required().min(6).max(50)
            .messages({
                "string.email": "Invalid email format. Please enter a valid email address."
            }), password: Joi.string().required().min(4).max(256),
        role: Joi.string().optional().min(4).max(10)
    });

    // Validation:
    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default UserModel;