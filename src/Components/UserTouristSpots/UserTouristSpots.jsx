import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UserTouristSpots = () => {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [touristSpots, setTouristSpots] = useState([]);
	useEffect(() => {
		fetch(`https://b9a10-server-side-gazi-fayaz.vercel.app/user-tourist-spots/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setTouristSpots(data);
				setLoading(false);
			});
	}, []);

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://b9a10-server-side-gazi-fayaz.vercel.app/delete-tourist-spot/${id}`, {
					method: "DELETE",
				})
					.then((res) => res.json())
					.then((data) => {
						console.log(data);
						if (data.deletedCount) {
							setTouristSpots(
								touristSpots.filter((touristSpot) => touristSpot._id !== id)
							);
							Swal.fire({
								title: "Deleted!",
								text: "Your file has been deleted.",
								icon: "success",
							});
						}
					});
			}
		});
	};
	// const touristSpots = useLoaderData()
	// console.log(id);
	if (loading) {
		return (
			<div className="flex justify-center ">
				<span className="loading loading-spinner loading-lg text-accent-pink "></span>
			</div>
		);
	}
	return (
		<div className="flex flex-col items-center text-center w-full">
			<Helmet>
				<title>GlobeGuide | My List</title>
			</Helmet>
			<h1 className="text-5xl font-bold text-accent-cyan">My List</h1>
			<div className="w-full mt-14  bg-slate-300 rounded-3xl px-5 py-10">
				<div className="overflow-x-auto">
					<table className="table">
						{/* head */}
						<thead>
							<tr>
								<th>Tourist Spot Name</th>
								<th>Country</th>
								<th>Location</th>
								<th>Average Cost</th>
								<th>Travel Time</th>
							</tr>
						</thead>
						<tbody>
							{touristSpots.map((touristSpot) => {
								return (
									<tr key={touristSpot._id}>
										<td>
											<div>
												<div className="font-bold">
													{touristSpot.tourist_spot_name}
												</div>
											</div>
										</td>
										<td>{touristSpot.country_name}</td>
										<td>{touristSpot.location}</td>
										<td>
											<span className="font-bold">$</span>
											{touristSpot.avg_cost}
										</td>
										<td>{touristSpot.travel_time} days</td>
										<th>
											<Link to={`../update-tourist-spot/${touristSpot._id}`}>
												<button className="btn bg-green-500 btn-xs">
													Update
												</button>
											</Link>
										</th>
										<th>
											<button
												onClick={() => handleDelete(touristSpot._id)}
												className="btn btn-error btn-xs"
											>
												Delete
											</button>
										</th>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default UserTouristSpots;
