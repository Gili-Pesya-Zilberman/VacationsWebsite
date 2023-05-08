import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import "./AdminVacationList.css";

function AdminVacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage, setVacationsPerPage] = useState(10);
    const navigate = useNavigate();

    // Validate that only admin can reach this page:
    useEffect(() => {
        // Extract token from local storage:
        const token = localStorage.getItem("token");
        // If there is no token:
        if (!token) {
            notify.error("You are not logged in!");
            navigate("/login");
            return;
        }
        // If there is token - extract the user role:
        const decodedToken: any = jwtDecode(token); // using 'any' type to avoid TypeScript error
        const role = decodedToken.user.role;
        // If user role is "User":
        if (role === "User") {
            notify.error("You are not admin!");
            navigate("/user-vacations");
            return;
        }
        // Here the user role must be "Admin":
        adminVacationsService.getAllVacations()
            .then(vacations => {
                // Sort the vacations by start date:
                vacations.sort((a, b) => {
                    const dateA = new Date(a.startDate);
                    const dateB = new Date(b.startDate);
                    return dateA.getTime() - dateB.getTime();
                });
                setVacations(vacations);
            })
            .catch(err => notify.error(err));
    }, []);

    // Delete clicked vacation:
    async function deleteClickedVacation(vacationId: number) {
        try {
            await adminVacationsService.deleteVacation(vacationId);
            // Refresh list:
            const duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId);
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    // Logic for displaying the correct vacations on the current page
    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = vacations.slice(indexOfFirstVacation, indexOfLastVacation);
    const totalPages = Math.ceil(vacations.length / vacationsPerPage);

    // Handle page changes function:
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="AdminVacationList">

            <div className="adminLinks">

                {/* Navigate to add vacation */}
                <NavLink to="/add"><i className="bi bi-plus-square-fill"></i></NavLink>

                {/* Navigate to reports */}
                <NavLink to="/reports"><i className="bi bi-bar-chart-line-fill"></i></NavLink>

            </div>

            {/* Display vacation cards for admin */}
            {currentVacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} deleteVacation={deleteClickedVacation} />)}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={i + 1 === currentPage ? "active" : ""}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );

}

export default AdminVacationList;