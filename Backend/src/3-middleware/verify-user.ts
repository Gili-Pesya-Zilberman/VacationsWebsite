import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { AuthenticationError } from "../4-models/client-errors";

// Verify user:
async function verifyUser(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {

        const isUser = await cyber.verifyUser(request);

        if (!isUser) {
            next(new AuthenticationError("You are not user"));
        }

        // If user - continue:
        next();
    }

    catch (err: any) {
        next(err);
    }
}

export default verifyUser;