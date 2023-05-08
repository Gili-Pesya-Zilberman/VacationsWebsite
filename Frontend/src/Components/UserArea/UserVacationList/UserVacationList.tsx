import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import "./UserVacationList.css";

function UserVacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isFollowedFilterActive, setIsFollowedFilterActive] = useState(false);
    const [isNotStartedFilterActive, setIsNotStartedFilterActive] = useState(false);
    const [isActiveFilterActive, setIsActiveFilterActive] = useState(false);
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage, setVacationsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        // Extract token from local storage:
        const token = localStorage.getItem("token");
        // If there is no token:
        if (!token) {
            notify.error("You are not logged in! <br>please log in or register first")
            navigate("/login");
            // Here the user must be logged in - user and admin:
        } else {
            userVacationsService.getAllVacations()
                .then(vacations => setVacations(vacations))
                .catch(err => alert(err.message));
        }
    }, []);

    // Filters:
    useEffect(() => {
        let filtered = vacations;
        if (isFollowedFilterActive) {
            filtered = filtered.filter(v => v.isFollowing);
        }
        if (isNotStartedFilterActive) {
            const now = new Date();
            filtered = filtered.filter(v => new Date(v.startDate) > now);
        }
        if (isActiveFilterActive) {
            const now = new Date();
            filtered = filtered.filter(v => new Date(v.startDate) <= now && new Date(v.endDate) >= now);
        }
        setFilteredVacations(filtered);
    }, [isFollowedFilterActive, isNotStartedFilterActive, isActiveFilterActive, vacations]);

    const handleFollowedFilterChange = () => {
        setIsFollowedFilterActive(!isFollowedFilterActive);
        setCurrentPage(1); // Reset to first page when filter is toggled
    };

    const handleNotStartedFilterChange = () => {
        if (!isNotStartedFilterActive) {
            setIsNotStartedFilterActive(true);
            setIsActiveFilterActive(false);
        } else {
            setIsNotStartedFilterActive(false);
        }
        setCurrentPage(1);
    };

    const handleActiveFilterChange = () => {
        if (!isActiveFilterActive) {
            setIsActiveFilterActive(true);
            setIsNotStartedFilterActive(false);
        } else {
            setIsActiveFilterActive(false);
        }
        setCurrentPage(1);
    };


    // Handle follow toggle:
    const handleFollowToggle = (vacationId: number) => {
        const updatedVacations = vacations.map(vacation => {
            if (vacation.vacationId === vacationId) {
                vacation.isFollowing = !vacation.isFollowing;
            }
            return vacation;
        });
        setVacations(updatedVacations);
    };

    // Handle page change - for pagination:
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastVacation = currentPage * vacationsPerPage;
    const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
    const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);
    const totalPages = Math.ceil(filteredVacations.length / vacationsPerPage);

    return (
        <div className="UserVacationList">

            {/* Filters */}
            <div className="filtersDiv">
                <span>
                    <input type="checkbox" checked={isFollowedFilterActive} onChange={handleFollowedFilterChange} />
                    Followed by me
                </span>

                <span>
                    <input type="checkbox" checked={isNotStartedFilterActive} onChange={handleNotStartedFilterChange} />
                    Vacations that did not start
                </span>

                <span>
                    <input type="checkbox" checked={isActiveFilterActive} onChange={handleActiveFilterChange} />
                    Vacations that are currently happening
                </span>
                <br />
            </div>

            {/* Display user vacations */}
            {currentVacations.map(v => (
                <UserVacationCard
                    key={v.vacationId}
                    vacation={v}
                    onFollowToggle={() => handleFollowToggle(v.vacationId)}
                />
            ))}

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

export default UserVacationList;