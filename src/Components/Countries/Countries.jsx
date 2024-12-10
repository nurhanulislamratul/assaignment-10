import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Countries = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/countries")
			.then((res) => res.json())
			.then((data) => setCountries(data));
	}, []);

	return (
		<div className="flex flex-col items-center text-center w-full">
			<h1 className="text-7xl font-bold text-accent-cyan">Countries</h1>
			<p className="w-3/4 text-xl mt-5 font-medium">
				<span className="font-bold">Explore</span> and{" "}
				<span className="font-bold">Find</span> the Best Country for{" "}
				<span className="font-bold">You!</span>
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-14">
				{countries.map((country) => {
					// console.log(country);
					return (
						<Link to={`/country/${country.country_name}`} key={country._id}>
							<div
								data-aos="zoom-in"
								className="card card-compact bg-base-100 shadow-xl w-full h-full"
								
							>
								<figure>
									<img
										src={country.img_url}
										alt="Shoes"
										className="h-[250px] w-full object-cover"
									/>
								</figure>
								<div className="card-body">
									<h2 className="card-title text-left text-3xl">
										{country.country_name}
									</h2>
									<p className="card text-justify text-xl">
										{country.description}
									</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Countries;
