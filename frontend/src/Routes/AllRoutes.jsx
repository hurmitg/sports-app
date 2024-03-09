import { Route, Routes } from "react-router-dom";
// import PrivateRoute from "../Components/PrivateRoute";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./HomePage";
import EventPage from "./EventPage";
import SingleEventPage from "./SingleEventPage";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            // <PrivateRoute>
            <HomePage />
            // </PrivateRoute>
          }
        ></Route>
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/event/:id"
          element={
            <PrivateRoute>
              <SingleEventPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/register" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default AllRoutes;
