import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { UserVacationsAction, UserVacationsActionType, userVacationsStore } from "../Redux/UserVacationsState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {

    // Get all vacations:
    public async getAllVacations(): Promise<VacationModel[]> {
        // Take vacations from global state:
        let vacations = userVacationsStore.getState().vacations;

        // If we don't have vacations: 
        if (vacations.length === 0) {

            // Fetch vacations from backend: 
            const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
            vacations = response.data;

            // Send all vacations into redux global state (which will call the reducer):
            const action: UserVacationsAction = { type: UserVacationsActionType.FetchVacations, payload: vacations };
            userVacationsStore.dispatch(action);
        }

        // Return products: 
        return vacations;

    }

    public async follow(userId: number, vacationId: number): Promise<void> {
        const response = await axios.post(`${appConfig.followUrl}${vacationId}`, { userId });
        const updatedVacation = response.data;

        // Update the vacation in the global state:
        const vacations = userVacationsStore.getState().vacations;
        const updatedVacations = vacations.map(vacation => {
            if (vacation.vacationId === updatedVacation.vacationId) {
                return updatedVacation;
            }
            else {
                return vacation;
            }
        });

        // Send updated vacations into redux global state:
        const action: UserVacationsAction = { type: UserVacationsActionType.FetchVacations, payload: updatedVacations };
        userVacationsStore.dispatch(action);
    }

    public async unfollow(userId: number, vacationId: number): Promise<void> {
        const response = await axios.delete(`${appConfig.unfollowUrl}${vacationId}`, { data: { userId } });
        const updatedVacation = response.data;

        // Update the vacation in the global state:
        const vacations = userVacationsStore.getState().vacations;
        const updatedVacations = vacations.map(vacation => {
            if (vacation.vacationId === updatedVacation.vacationId) {
                return updatedVacation;
            }
            else {
                return vacation;
            }
        });

        // Send updated vacations into redux global state:
        const action: UserVacationsAction = { type: UserVacationsActionType.FetchVacations, payload: updatedVacations };
        userVacationsStore.dispatch(action);
    }

}

const userVacationsService = new UserVacationsService();

export default userVacationsService;