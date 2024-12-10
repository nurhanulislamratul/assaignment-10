import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Providers/ThemeProvider";
import { Slide } from "react-awesome-reveal";

const Root = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		console.log("initial theme", theme);
		if (!localStorage.getItem("theme")) {
			localStorage.setItem("theme", theme);
			// setTheme("light");
			setLoading(false);
		}
		if (localStorage.getItem("theme") === "dark") {
			setTheme("dark");
			setLoading(false);
		} else {
			setTheme("light");
			setLoading(false);
		}
	}, [theme]);

	if (loading) {
		return <div className="w-full bg-black h-screen"></div>;
	}

	return (
		<div
			className={`font-poppins min-h-screen flex flex-col justify-between 
			${theme === "light" ? "bg-bg-light" : "bg-gray-800"}
			`}
		>
			<Navbar theme={[theme, setTheme]}></Navbar>
			<Slide>
				<div className="mx-6 md:mx-12 lg:mx-32">
					<Outlet></Outlet>
					<ToastContainer />
				</div>
			</Slide>

			<Footer></Footer>
		</div>
	);
};

export default Root;
