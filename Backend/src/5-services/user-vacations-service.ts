import dal from "../2-utils/dal";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

// Get all vacations:
async function getAllVacations(user: UserModel): Promise<VacationModel[]> {

    const sql = `
    SELECT DISTINCT
        V.*,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersCount
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate

    `;

    const vacations = await dal.execute(sql, user.userId);

    return vacations;

}

// Follow:
async function follow(userId: number, vacationId: number): Promise<void> {
    const sql = "INSERT INTO followers VALUES(?,?)";
    await dal.execute(sql, userId, vacationId);
}

// Follow:
async function unfollow(userId: number, vacationId: number): Promise<void> {
    const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
    await dal.execute(sql, userId, vacationId);
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
    follow,
    unfollow,
    getImageNameFromDB
}