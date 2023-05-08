import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";

// Get all vacations - admin:
async function getAllVacations(): Promise<VacationModel[]> {

    // Create query: 
    const sql = "SELECT * FROM vacations ORDER BY startDate";

    // Execute query: 
    const vacations = await dal.execute(sql);

    // Return vacations:
    return vacations;

}

// Get one vacation:
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    // Create query: 
    const sql = "SELECT * FROM vacations WHERE vacationId=?";

    // Execute query:
    const vacations = await dal.execute(sql, vacationId);

    // Extract the single vacation: 
    const vacation = vacations[0];

    // If vacation not found: 
    if (!vacation) throw new ResourceNotFoundError(vacationId);

    // Return data:
    return vacation;

}

// Add vacation:
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation:
    vacation.validatePost();

    // Save image to disk and get back its name:
    vacation.imageName = await imageHandler.saveImage(vacation.image);

    // Create query: 
    const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ? ,?)";

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);

    // Get the new id into vacation:
    vacation.vacationId = result.insertId;

    // Delete image property (which is the sent file object) from vacation object:
    delete vacation.image;

    // Return vacation:
    return vacation;

}

// Update existing vacation:
async function UpdateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation:
    vacation.validatePut();

    // Get image name from database: 
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);

    // Update existing image:
    if (vacation.image) {
        vacation.imageName = await imageHandler.updateImage(vacation.image, vacation.imageName);
    }

    // Create query: 
    const sql = "UPDATE vacations SET destination=?, description=?,startDate=?, endDate=?, price=?, imageName=? WHERE vacationId=?";

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName, vacation.vacationId);

    // If vacation not exist:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image property (which is the sent file object) from vacation object:
    delete vacation.image;

    // Return updated product:
    return vacation;

}

// Delete existing vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    // Get image name from database: 
    const imageName = await getImageNameFromDB(vacationId);

    // Delete that image from hard-disk: 
    imageHandler.deleteImage(imageName);

    // Create sql query: 
    const sql = "DELETE FROM vacations WHERE vacationId = ?";

    // Execute query: 
    const result: OkPacket = await dal.execute(sql, vacationId);

    // If id not exists:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);
}

// Get image name from database: 
async function getImageNameFromDB(vacationId: number): Promise<string> {

    // Create sql query:
    const sql = "SELECT imageName FROM vacations WHERE vacationId = ?";

    // Get object array:
    const vacations = await dal.execute(sql, vacationId);

    // Extract single vacation: 
    const vacation = vacations[0];

    // If no such vacation: 
    if (!vacation) return null;

    // Return image name:
    return vacation.imageName;

}

export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    UpdateVacation,
    deleteVacation
};