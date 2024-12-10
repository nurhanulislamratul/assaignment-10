import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateTouristSpot = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [touristSpot, setTouristSpot] = useState({});
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	useEffect(() => {
		fetch(`https://b9a10-server-side-gazi-fayaz.vercel.app/tourist-spot/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTouristSpot(data);
				setLoading(false);
			});
	}, []);

	const {
		register,
		handleSubmit,
		formState: { isDirty },
	} = useForm({
		defaultValues: touristSpot
	});

	const onSubmit = (data) => {
		console.log(data);
		fetch(`https://b9a10-server-side-gazi-fayaz.vercel.app/update-tourist-spot/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			if (data.modifiedCount) {
				toast.success("Tourist Spot Updated Successfully");
			}
		})
	};

	console.log(id);
	if (loading) {
		return (
			<div className="flex justify-center ">
				<span className="loading loading-spinner loading-lg text-accent-pink "></span>
			</div>
		);
	}
	// console.log(watch("img_url"));
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
						defaultValue={touristSpot.img_url}
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
						defaultValue={touristSpot.tourist_spot_name}
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
							defaultValue={touristSpot.country_name}
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
							defaultValue={touristSpot.location}
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
						defaultValue={touristSpot.description}
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
							defaultValue={touristSpot.avg_cost}
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
							defaultValue={touristSpot.season}
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
						defaultValue={touristSpot.travel_time}
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
						defaultValue={touristSpot.visitors}
						type="Number"
						name="visitors"
						id="visitors"
						placeholder="Visitors Every Year"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<input
					disabled={!isDirty}
					type="submit"
					value={"Update Tourist Spot"}
					className="btn w-full text-xl border-none bg-accent-pink text-white"
				/>
			</form>
		</div>
	);
};

export default UpdateTouristSpot;
