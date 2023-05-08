import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/AppConfig";
import notify from "../../../Utils/Notify";
import "./AdminVacationCard.css";

interface AdminVacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
}

function AdminVacationCard(props: AdminVacationCardProps): JSX.Element {

    const navigate = useNavigate();

    // format date - get date and returning it in the format dd.mm.yyyy:
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    // Delete vacation:
    async function deleteMe() {
        try {
            // Validate if the admin is sure:
            if (!window.confirm("Are you sure?")) return;
            await props.deleteVacation(props.vacation.vacationId);
            notify.success("Vacation has been deleted");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Navigate to edit the vacation that have been chosen:
    function editMe(vacationId: number) {
        navigate("/edit/" + vacationId);
    }

    return (

        <div className="AdminVacationCard cardDiv">

            <span className="destinationSpan">{props.vacation.destination}</span>
            <br></br>

            <img src={appConfig.adminVacationsImagesUrl + props.vacation.imageName} />
            <br></br>

            <i className="bi bi-calendar-event"></i> {formatDate(props.vacation.startDate)} - {formatDate(props.vacation.endDate)}
            <br></br>

            <i className="bi bi-cash-stack" /> ₪{props.vacation.price}
            <br></br>

            {props.vacation.description}
            <br></br>

            {/* Delete button */}
            <button onClick={deleteMe} className="deleteButton"><i className="bi bi-x-square"></i></button>
            <br />

            {/* Edit button */}
            <button onClick={() => editMe(props.vacation.vacationId)} className="editButton"><i className="bi bi-pencil-square"></i></button>

        </div>

    );
}

export default AdminVacationCard;