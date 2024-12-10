import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import ThemeProvider from "./Providers/ThemeProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<AuthProvider>
				<ThemeProvider>
					<RouterProvider router={router}></RouterProvider>
				</ThemeProvider>
			</AuthProvider>
		</HelmetProvider>
	</React.StrictMode>
);
