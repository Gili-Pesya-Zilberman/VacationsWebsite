import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import imageHandler from "../2-utils/image-handler";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyUser from "../3-middleware/verify-user";
import userVacationsService from "../5-services/user-vacations-service";

const router = express.Router();

// Get all vacations:
// GET http://localhost:4000/api/vacations
router.get("/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacations = await userVacationsService.getAllVacations(user);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Follow vacation:
// POST http://localhost:4000/api/follow/:vacationId
router.post("/follow/:vacationId([0-9]+)", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await userVacationsService.follow(user.userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// Unfollow vacation:
// DELETE http://localhost:4000/api/unfollow/:vacationId
router.delete("/unfollow/:vacationId([0-9]+)", verifyUser, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request);
        const vacationId = +request.params.vacationId;
        await userVacationsService.unfollow(user.userId, vacationId);
        response.sendStatus(201);
    }
    catch (err: any) {
        next(err);
    }
});

// Get image:
// GET http://localhost:4000/api/vacations/images/:imageName
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;