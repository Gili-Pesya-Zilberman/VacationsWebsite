import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { AdminVacationsAction, AdminVacationsActionType, adminVacationsStore } from "../Redux/AdminVacationsState";
import appConfig from "../Utils/AppConfig";

class AdminVacationsService {

    // Get all vacations - admin:
    public async getAllVacations(): Promise<VacationModel[]> {

        // Take vacations from global state:
        let vacations = adminVacationsStore.getState().vacations;

        // If we don't have vacations: 
        if (vacations.length === 0) {

            // Fetch vacations from backend: 
            const response = await axios.get<VacationModel[]>(appConfig.adminVacationsUrl);
            vacations = response.data;

            // Send all vacations into redux global state (which will call the reducer):
            const action: AdminVacationsAction = { type: AdminVacationsActionType.FetchVacations, payload: vacations };
            adminVacationsStore.dispatch(action);
        }

        // Return products: 
        return vacations;
    }

    // Get one Vacation for admin:
    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        // Take vacations from global state:
        let vacations = adminVacationsStore.getState().vacations;

        // Find needed vacation from global state: 
        let vacation = vacations.find(v => v.vacationId === vacationId);

        // If vacation not found:
        if (!vacation) {

            // Get vacation form server: 
            const response = await axios.get<VacationModel>(appConfig.adminVacationsUrl + vacationId);
            vacation = response.data;
        }

        // Return vacation: 
        return vacation;

    }

    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" }; // Tell axios that we're sending text and file to backend:
        const response = await axios.post<VacationModel>(appConfig.adminVacationsUrl, vacation, { headers });
        const addedVacation = response.data;

        // Send added vacation into redux global state (which will call the reducer):
        adminVacationsStore.dispatch({ type: AdminVacationsActionType.AddVacation, payload: addedVacation });

    }

    // Update vacation:
    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" }; // Tell axios that we're sending text and file to backend:
        const response = await axios.put<VacationModel>(appConfig.adminVacationsUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;

        // Send update vacation into redux global state (which will call the reducer):
        adminVacationsStore.dispatch({ type: AdminVacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    // Delete vacation: 
    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationsUrl + vacationId);
    }

}

const adminVacationsService = new AdminVacationsService();

export default adminVacationsService;