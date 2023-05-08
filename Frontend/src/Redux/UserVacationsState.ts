import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - application level state:
export class UserVacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum UserVacationsActionType {
    FetchVacations = "FetchVacations",
    FollowVacation = "FollowVacation",
    UnfollowVacation = "UnfollowVacation"
}

// 3. Action - a single object describing single operation on the data:
export interface UserVacationsAction {
    type: UserVacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function userVacationsReducer(
    currentState = new UserVacationsState(),
    action: UserVacationsAction
): UserVacationsState {
    const newState: UserVacationsState = { ...currentState };

    switch (action.type) {
        case UserVacationsActionType.FetchVacations:
            newState.vacations = action.payload;
            break;

        case UserVacationsActionType.FollowVacation:
            // Find the vacation in the state and update its isFollowing property
            newState.vacations = newState.vacations.map(vacation => {
                if (vacation.vacationId === action.payload) {
                    vacation.isFollowing = true;
                    vacation.followersCount++;
                }
                return vacation;
            });
            break;

        case UserVacationsActionType.UnfollowVacation:
            // Find the vacation in the state and update its isFollowing property
            newState.vacations = newState.vacations.map(vacation => {
                if (vacation.vacationId === action.payload) {
                    vacation.isFollowing = false;
                    vacation.followersCount--;
                }
                return vacation;
            });
            break;

    }

    return newState;
}

// 5. Store - Redux manager:
export const userVacationsStore = createStore(userVacationsReducer);