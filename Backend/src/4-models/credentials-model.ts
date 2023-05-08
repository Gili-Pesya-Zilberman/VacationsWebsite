import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // Validation Schema:
    public static validationSchema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } })
            .required().min(6).max(50)
            .messages({
                "string.email": "Invalid email format. Please enter a valid email address."
            }),
        password: Joi.string().required().min(4).max(256),
    });


    // Validation:
    public validate(): void {
        const result = CredentialsModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;