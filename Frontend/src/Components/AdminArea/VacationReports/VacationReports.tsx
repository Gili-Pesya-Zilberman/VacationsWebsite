import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/VacationModel";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import "./VacationReports.css";

function VacationReports(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate();

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
        // Here the role must be "Admin":
        userVacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => alert(err.message));
    }, []);

    // Get data for chart:
    function getChartData(): { name: string, followersCount: number }[] {
        return vacations.map(vacation => ({
            name: vacation.destination,
            followersCount: vacation.followersCount
        }));
    }

    // Get data for scv:
    function getCsvData(): { destination: string, followersCount: number }[] {
        return vacations.map(vacation => ({
            destination: vacation.destination,
            followersCount: vacation.followersCount
        }));
    }

    return (
        <div className="VacationReports">

            <h3>
                Destinations and Followers Report
                {/* CSV Link */}
                <CSVLink data={getCsvData()} filename={"vacations.csv"}>
                    <button><i className="bi bi-filetype-csv"></i></button>
                </CSVLink>
            </h3>

            {/* Chart */}
            <div className="ChartDiv">
                <BarChart width={1000} height={350} data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" tick={{ fontSize: 12 }} height={60} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend
                        align="left"
                        verticalAlign="bottom"
                        wrapperStyle={{ marginLeft: "50px", paddingTop: "10px", fontSize: 14 }}
                    />
                    <Bar dataKey="followersCount" name="Followers" fill="#000" />
                </BarChart>
            </div>
        </div>
    );
}

export default VacationReports;