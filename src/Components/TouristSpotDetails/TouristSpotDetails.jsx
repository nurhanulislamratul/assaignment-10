import { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MdOutlineModeOfTravel } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoMdRainy } from "react-icons/io";
import { ThemeContext } from "../../Providers/ThemeProvider";

const TouristSpotDetails = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const { theme, setTheme } = useContext(ThemeContext);
	const touristSpot = useLoaderData();
	return (
		<div>
			<Helmet>
				<title>GlobeGuide | {touristSpot.tourist_spot_name}</title>
			</Helmet>
			<div className={`rounded-3xl flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0 ${theme==="light"? "":"text-white"}`}>
				<img
					data-aos="fade-right"
					src={touristSpot.img_url}
					alt=""
					className=" object-cover rounded-lg lg:rounded-3xl lg:w-1/2"
				/>
				<div
					data-aos="fade-left"
					className="lg:ml-10 flex flex-col lg:w-1/2 justify-between"
				>
					<div className="h-full mb-7 lg:mb-0">
						<h1 className="text-2xl lg:text-4xl font-bold">
							{touristSpot.tourist_spot_name}
						</h1>
						<p className="text-xl font-medium mt-2">
							{touristSpot.location}, {touristSpot.country_name}
						</p>

						<p className="text-justify mt-4 lg:text-lg italic font-medium lg:leading-6">
							{touristSpot.description}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<IoMdRainy className="text-2xl" />
						<p className="font-bold text-xl">
							Seasonality: {touristSpot.season}
						</p>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<MdOutlineModeOfTravel className="text-2xl" />
						<p className="font-bold text-xl">
							Expected Travel Time: {touristSpot.travel_time} days
						</p>
					</div>
					<div className="mt-5 flex flex-col gap-2">
						<div className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center">
							<div className="flex items-center gap-2 text-left lg:text-lg">
								<HiUserGroup className="text-lg lg:text-2xl" />
								<span className="font-bold text-xl">
									Visitors: {touristSpot.visitors}/yr
								</span>
							</div>
							<div className="flex items-center gap-2 text-left lg:text-lg">
								<AiFillDollarCircle className="text-lg lg:text-2xl" />{" "}
								<span className="font-bold text-xl">
									Estimated Cost: ${touristSpot.avg_cost}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TouristSpotDetails;
