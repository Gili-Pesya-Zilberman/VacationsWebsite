import express, { NextFunction, Request, Response } from "express";
import imageHandler from "../2-utils/image-handler";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import adminVacationsService from "../5-services/admin-vacations-service";

const router = express.Router(); // Capital R

// Get all vacations:
// GET http://localhost:4000/api/admin/vacations
router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await adminVacationsService.getAllVacations();
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});

// Get one vacation:
// GET http://localhost:4000/api/admin/vacations/:vacationId
router.get("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await adminVacationsService.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Add vacation:
// POST http://localhost:4000/api/admin/vacations
router.post("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await adminVacationsService.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Update vacation:
// PUT http://localhost:4000/api/admin/vacations/:vacationId
router.put("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.vacationId;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await adminVacationsService.UpdateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete vacation:
// DELETE http://local8host:4000/api/admin/vacations/:vacationId
router.delete("/admin/vacations/:vacationId([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await adminVacationsService.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

// Get image:
// GET http://localhost:4000/api/admin/vacations/images/:imageName
router.get("/admin/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
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