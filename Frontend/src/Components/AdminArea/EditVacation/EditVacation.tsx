import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import appConfig from "../../../Utils/AppConfig";
import notify from "../../../Utils/Notify";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [selectedImage, setSelectedImage] = useState<File | undefined>();
    const [vacation, setVacation] = useState<VacationModel>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        // Validate that only admin can reach this page:
        // Extract token from local storage:
        const token = localStorage.getItem("token");
        // If there is no token:
        if (!token) {
            notify.error("You are not logged in!")
            navigate("/login");
            return;
        }
        // If there is token - extract the user role:
        const decodedToken: any = jwtDecode(token); // using 'any' type to avoid TypeScript error
        const role = decodedToken.user.role;
        // If user role is "User":
        if (role === "User") {
            notify.error("You are not  admin!")
            navigate("/user-vacations");
            return;
        }

        // Here the user must be "Admin":
        adminVacationsService.getOneVacation(+params.vacationId)
            .then(vacation => {

                const startDate = new Date(vacation.startDate);
                const formattedStartDate = startDate.toISOString().split('T')[0];
                const endDate = new Date(vacation.endDate);
                const formattedEndDate = endDate.toISOString().split('T')[0];

                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", formattedStartDate);
                setValue("endDate", formattedEndDate);
                setValue("price", vacation.price);
                setVacation(vacation);

            })
            .catch(err => notify.error(err));
    }, []);

    // Send edit vacation function:
    async function send(vacation: VacationModel) {
        try {
            // Checking if the start day is at least one day before end date
            const startDate = new Date(vacation.startDate);
            const endDate = new Date(vacation.endDate);
            // Add one day to the start date
            startDate.setDate(startDate.getDate() + 1);
            if (endDate < startDate) {
                notify.error("End date cannot be before or on start date!");
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminVacationsService.updateVacation(vacation);
            alert("Vacation has been Updated!");
            // Fetch the updated vacation list and sort it by start date
            const updatedVacations = await adminVacationsService.getAllVacations();
            updatedVacations.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            // Update the state variable with the sorted vacation list
            setVacations(updatedVacations);
            // Navigate back to admin vacations list:
            navigate(-1);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Handle image change if needed:
    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        }
    }

    // start date state
    const [startDate, setStartDate] = useState<string>("");

    // maxDate - for end date:
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const endDate = tomorrow.toISOString().split('T')[0];

    return (
        <div className="EditVacation">

            <h3>Edit Vacation</h3>

            <div className="containerDiv">

                <form onSubmit={handleSubmit(send)}>

                    <input type="hidden" {...register("vacationId")} />

                    <label>Destination: </label>
                    <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                    <span className="Err">{formState.errors.destination?.message}</span>

                    <label>Description: </label>
                    <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                    <span className="Err">{formState.errors.description?.message}</span>

                    <label>Start date: </label>
                    <input type="date" {...register("startDate", VacationModel.startDateValidation)} />
                    <span className="Err">{formState.errors.startDate?.message}</span>

                    <label>End date: </label>
                    <input type="date" {...register("endDate", VacationModel.endDateValidation)} />
                    <span className="Err">{formState.errors.endDate?.message}</span>

                    <label>Price: </label>
                    <input type="number"{...register("price", VacationModel.priceValidation)} />
                    <span className="Err">{formState.errors.price?.message}</span>

                    <label>Current image:</label>
                    <img src={selectedImage ? URL.createObjectURL(selectedImage) : appConfig.adminVacationsImagesUrl + vacation?.imageName} />
                    <input type="file" accept="image/*" {...register("image")} onChange={handleImageChange} />

                    <button>Update</button>

                    <div>
                        <NavLink to="/admin-vacations">Cancel</NavLink>
                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditVacation;