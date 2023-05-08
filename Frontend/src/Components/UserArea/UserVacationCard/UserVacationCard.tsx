import jwtDecode from "jwt-decode";
import { useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import userVacationsService from "../../../Services/UserVacationsService";
import appConfig from "../../../Utils/AppConfig";
import notify from "../../../Utils/Notify";
import "./UserVacationCard.css";

interface UserVacationCardProps {
    vacation: VacationModel;
    onFollowToggle: () => void;
}

function UserVacationCard(props: UserVacationCardProps): JSX.Element {

    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
    const [followersCount, setFollowersCount] = useState(props.vacation.followersCount);

    // format date - get date and returning it in the format dd.mm.yyyy:
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Extract userId from the user that is logged in:
    const token = localStorage.getItem("token");
    const decodedToken: any = jwtDecode(token); // using 'any' type to avoid TypeScript error
    const userId = decodedToken.user.userId;

    // Toggle function with follow and unfollow:
    async function toggleFollowVacation() {
        try {
            if (isFollowing) {
                await userVacationsService.unfollow(userId, props.vacation.vacationId);
                setIsFollowing(false);
                setFollowersCount(followersCount - 1);
            } else {
                await userVacationsService.follow(userId, props.vacation.vacationId);
                setIsFollowing(true);
                setFollowersCount(followersCount + 1);
            }
            props.onFollowToggle(); // notify parent component that follow status has changed
        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="UserVacationCard cardDiv">

            <span className="destinationSpan">{props.vacation.destination}</span>
            <br />

            <img src={appConfig.userVacationsImages + props.vacation.imageName} />
            <br />

            <i className="bi bi-calendar2-event-fill" /> {formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}
            <br />

            <i className="bi bi-cash-stack" />  ₪{props.vacation.price}
            <br />

            {props.vacation.description}
            <br />

            <button onClick={toggleFollowVacation} className="followButton">
                {isFollowing ? <span><i className="bi bi-star-fill"></i> {followersCount}</span> : <span><i className="bi bi-star"></i> {followersCount}</span>}
            </button>

        </div>
    );
}

export default UserVacationCard;