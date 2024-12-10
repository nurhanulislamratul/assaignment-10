import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Providers/ThemeProvider";

const Stats = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	useEffect(() => {
		fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/tourist-spots-count")
			.then((res) => res.json())
			.then((data) => setTouristSpotCount(data.length));

		fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/countries-count")
			.then((res) => res.json())
			.then((data) => setCountryCount(data.length));

		fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/users-count")
			.then((res) => res.json())
			.then((data) => setUserCount(data.length));
	}, []);

	const [touristSpotCount, setTouristSpotCount] = useState(0);
	const [countryCount, setCountryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
	return (
		<div className={`stats stats-vertical lg:stats-horizontal shadow ${theme === "light" ? "bg-white" : "bg-accent-dark-blue"} w-full`}>
			<div className="stat place-items-center">
				<div className="stat-title text-lg font-semibold text-accent-pink">Total Tourist Spots</div>
				<div className={`stat-value ${theme === "light" ? "" : "text-white"}  text-6xl`}>{touristSpotCount}</div>
			</div>

			<div className="stat place-items-center">
				<div className="stat-title text-lg font-semibold text-accent-pink">Total Countries</div>
				<div className={`stat-value ${theme === "light" ? "" : "text-white"}  text-6xl`}>{countryCount}</div>
			</div>

			<div className="stat place-items-center">
				<div className="stat-title text-lg font-semibold text-accent-pink">Active Users</div>
				<div className={`stat-value ${theme === "light" ? "" : "text-white"}  text-6xl`}>{userCount}</div>
			</div>
		</div>
	);
};

export default Stats;
