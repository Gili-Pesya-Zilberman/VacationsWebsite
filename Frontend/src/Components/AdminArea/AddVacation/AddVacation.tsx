import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string>(""); // added state for selected image
    const navigate = useNavigate();

    // Validate that only admin can reach this page:
    useEffect(() => {
        // Extract token from local storage:
        const token = localStorage.getItem("token");
        // If there is no token:
        if (!token) {
            notify.error("You are not logged in!")
            navigate("/login");
            return;
        }
        // If there is token - extract the user role:
        const decodedToken: any = jwtDecode(token);
        const role = decodedToken.user.role;
        // If user role is "User":
        if (role === "User") {
            notify.error("You are not  admin!")
            navigate("/user-vacations");
            return;
        }
    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            await adminVacationsService.addVacation(vacation);
            notify.success("Vacation has been added.");

            // Refresh vacations:
            const updatedVacations = [...vacations, vacation].sort((a, b) =>
                new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            );
            setVacations(updatedVacations);

            // Navigate to admin-vacations after rendering the updated vacations:
            navigate("/admin-vacations");
        }
        catch (err: any) {
            notify.error(err);
        }
    }


    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // generate temporary URL
        } else {
            setSelectedImage("");
        }
    }

    // minDate - for start day:
    const minDate = new Date().toISOString().split('T')[0];

    // maxDate - for end date:
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const endDate = tomorrow.toISOString().split('T')[0];

    // Handle start date change - to prevent selecting end date that is before start date:
    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const selectedDate = new Date(event.target.value);
        selectedDate.setDate(selectedDate.getDate() + 1); // Add one day to the selected date
        const nextDay = selectedDate.toISOString().substr(0, 10); // Format the date as YYYY-MM-DD
        setStartDate(nextDay);
    }

    return (

        <div className="AddVacation containerDiv">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination:</label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description:</label>
                <input type="text"  {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <label>Start date: </label>
                <input type="date" min={minDate} {...register("startDate", VacationModel.startDateValidation)} onChange={handleStartDateChange} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>End date: </label>
                <input type="date" min={startDate || endDate} {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price:</label>
                <input type="number" step="0.01"  {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image:</label>
                <input type="file" accept="image/*" {...register("image", VacationModel.imageValidation)} onChange={handleImageChange} />
                {selectedImage && <img src={selectedImage} alt="Selected" width="150" height="150" />}
                <span className="Err">{formState.errors.image?.message}</span>

                <button>Add Vacation</button>

                <div>
                    <NavLink to="/admin-vacations">Cancel</NavLink>
                </div>

            </form>

        </div >
    );
}

export default AddVacation;