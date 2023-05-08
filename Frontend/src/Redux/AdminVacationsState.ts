import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - application level state:
export class AdminVacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum AdminVacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

// 3. Action - a single object describing single operation on the data:
export interface AdminVacationsAction {
    type: AdminVacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function adminVacationsReducer(currentState = new AdminVacationsState(), action: AdminVacationsAction): AdminVacationsState {

    console.log(action);

    const newState: AdminVacationsState = { ...currentState };

    switch (action.type) {

        case AdminVacationsActionType.FetchVacations: // Here the payload is the vacation list fetch by the server
            newState.vacations = action.payload;
            break;

        case AdminVacationsActionType.AddVacation: // Here the payload is the added vacation
            newState.vacations.push(action.payload);
            break;

        case AdminVacationsActionType.UpdateVacation: // Here the payload is the updated vacation
            const indexToUpdate = newState.vacations.findIndex(V => V.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case AdminVacationsActionType.DeleteVacation: // Here the payload is id to delete
            const indexToDelete = newState.vacations.findIndex(V => V.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

    }

    return newState;

}


// 5. Store - Redux manager:
export const adminVacationsStore = createStore(adminVacationsReducer);