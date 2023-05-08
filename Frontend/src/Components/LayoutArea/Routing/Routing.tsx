import { Navigate, Route, Routes } from "react-router-dom";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import AdminVacationList from "../../AdminArea/AdminVacationList/AdminVacationList";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import VacationReports from "../../AdminArea/VacationReports/VacationReports";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Home from "../../HomeArea/Home/Home";
import UserVacationList from "../../UserArea/UserVacationList/UserVacationList";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {

    return (
        <Routes>

            {/* Register */}
            <Route path="/register" element={<Register />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* User - vacations */}
            <Route path="/user-vacations" element={<UserVacationList />} />

            {/* Admin - vacations */}
            <Route path="/admin-vacations" element={<AdminVacationList />} />

            {/* Add */}
            <Route path="/add" element={<AddVacation />} />

            {/* Edit */}
            <Route path="/edit/:vacationId" element={<EditVacation />} />

            {/* Reports */}
            <Route path="/reports" element={<VacationReports />} />

            {/* Home */}
            <Route path="/home" element={<Home />} />

            {/* Default */}
            <Route path="/" element={<Navigate to="/home" />} />

            {/* Page not found */}
            <Route path="*" element={<PageNotFound />} />

        </Routes>
    );
}

export default Routing;