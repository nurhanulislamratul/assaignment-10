import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Components/Home/Home";
import AddTouristSpot from "../Components/AddTouristSpot/AddTouristSpot";
import AllTouristSpots from "../Components/AllTouristSpots/AllTouristSpots";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import TouristSpotDetails from "../Components/TouristSpotDetails/TouristSpotDetails";
import UserTouristSpots from "../Components/UserTouristSpots/UserTouristSpots";
import UpdateTouristSpot from "../Components/UpdateTouristSpot/UpdateTouristSpot";
import ErrorElement from "../Components/Error/ErrorElement";
import CountryTouristSpots from "../Components/CountryTouristSpots/CountryTouristSpots";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root></Root>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/all-tourist-spots",
				element: <AllTouristSpots></AllTouristSpots>,
			},
			{
				path: "/add-tourist-spot",
				element: (
					<PrivateRoutes>
						<AddTouristSpot></AddTouristSpot>
					</PrivateRoutes>
				),
			},
			{
				path: "/tourist-spot/:id",
				element: (
					<PrivateRoutes>
						<TouristSpotDetails></TouristSpotDetails>
					</PrivateRoutes>
				),
				loader: ({ params }) =>
					fetch(`http://localhost:5000/tourist-spot/${params.id}`),
			},
			{
				path: "/user-tourist-spots/:id",
				element: (
					<PrivateRoutes>
						<UserTouristSpots></UserTouristSpots>
					</PrivateRoutes>
				),
			},
			{
				path: "/country/:country_name",
				element: <CountryTouristSpots></CountryTouristSpots>,
			},
			{
				path: "/update-tourist-spot/:id",
				element: (
					<PrivateRoutes>
						<UpdateTouristSpot></UpdateTouristSpot>
					</PrivateRoutes>
				),
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
		errorElement: <ErrorElement></ErrorElement>,
	},
]);
