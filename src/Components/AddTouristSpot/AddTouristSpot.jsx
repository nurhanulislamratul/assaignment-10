import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddTouristSpot = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: { user_name: user.displayName, user_email: user.email },
	});

	const onSubmit = (data) => {
		data.avg_cost = parseInt(data.avg_cost);
		data.travel_time = parseInt(data.travel_time);
		data.visitors = parseInt(data.visitors);
		let flag = 0;
		console.log(data);
		fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/countries")
			.then((res) => res.json())
			.then((countries) => {
				console.log(countries);
				countries.forEach((country) => {
					console.log(country.country_name, data.country_name);
					if (country.country_name === data.country_name) {
						flag = 1;
						fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/tourist-spot", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(data),
						})
							.then((res) => res.json())
							.then((data) => {
								console.log(data);
								if (data.insertedId) {
									fetch(`https://b9a10-server-side-gazi-fayaz.vercel.app/update-user/${user.uid}`, {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
										},
										body: JSON.stringify({ insertedId: data.insertedId }),
									})
										.then((res) => res.json())
										.then((data) => {
											console.log(data);
											if (data.modifiedCount) {
												toast.success("Tourist Spot Added Successfully");
												navigate("/");
											}
										});
								}
							});
					}
				});
				if (flag === 0) {
					toast.error(`Not a valid country!
				Available Countries: 
				${countries.map((country) => " " + country.country_name)}`);
				}
			});
	};

	console.log(watch("img_url"));
	return (
		<div className="flex-1 flex items-center">
			<Helmet>
				<title>GlobeGuide | Add Tourist Spot</title>
			</Helmet>
			<form
				data-aos="fade-down"
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-accent-dark-blue rounded-2xl md:rounded-3xl"
			>
				<h1 className="text-3xl font-bold text-center text-white">
					Add Tourist Spot
				</h1>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">Image URL</p>
					<input
						{...register("img_url", { required: true })}
						type="text"
						name="img_url"
						id="img_url"
						placeholder="Image URL"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">
						Tourist Spot Name
					</p>
					<input
						{...register("tourist_spot_name", { required: true })}
						type="text"
						name="tourist_spot_name"
						id="tourist_spot_name"
						placeholder="Tourist Spot Name"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="flex gap-2 w-full">
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">
							Country Name
						</p>
						<input
							{...register("country_name", { required: true })}
							type="text"
							name="country_name"
							id="country_name"
							placeholder="Country Name"
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">Location</p>
						<input
							{...register("location", { required: true })}
							type="text"
							name="location"
							id="location"
							placeholder="Location"
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
				</div>

				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">
						Short Description
					</p>
					<textarea
						{...register("description", { required: true })}
						type="text"
						name="description"
						id="description"
						placeholder="Short Description"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>

				<div className="flex gap-2 w-full">
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">
							Average Cost ($)
						</p>
						<input
							{...register("avg_cost", { required: true })}
							type="number"
							name="avg_cost"
							id="avg_cost"
							placeholder="Average Cost"
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">Seasonality</p>
						<input
							{...register("season", { required: true })}
							type="text"
							name="season"
							id="season"
							placeholder="Ex. Summer, Winter etc."
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">
						Travel Time (Days)
					</p>
					<input
						{...register("travel_time", { required: true })}
						type="Number"
						name="travel_time"
						id="travel_time"
						placeholder="Expected Travel Time"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">
						Total Visitors/Year
					</p>
					<input
						{...register("visitors", { required: true })}
						type="Number"
						name="visitors"
						id="visitors"
						placeholder="Visitors Every Year"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="flex gap-2 w-full">
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">User Email</p>
						<input
							{...register("user_email", { required: true })}
							value={user.email}
							type="email"
							name="user_email"
							id="user_email"
							placeholder="User Email"
							disabled
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
					<div className="w-full">
						<p className="text-xl font-semibold text-white mb-2">User Name</p>
						<input
							{...register("user_name", { required: true })}
							value={user.displayName}
							type="text"
							name="user_name"
							id="user_name"
							placeholder="User Name"
							disabled
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
					</div>
				</div>
				{errors.user_name && console.log(errors.user_name)}
				<input
					type="submit"
					value={"Add Tourist Spot"}
					className="btn w-full text-xl border-none bg-accent-pink text-white"
				/>
			</form>
		</div>
	);
};

export default AddTouristSpot;
