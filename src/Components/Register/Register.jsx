import { useForm } from "react-hook-form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	const successToast = (message) =>
		toast.success(message, { position: "bottom-right" });
	const errorToast = (message) =>
		toast.error(message, { position: "bottom-right" });
	const { loading, setLoading, createUserEmailPassword, customizeProfile } =
		useContext(AuthContext);
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const { register, handleSubmit, watch } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		if (data.password.length < 6) {
			errorToast("Password must be at least 6 characters");
			if (!/[A-Z]/.test(data.password)) {
				errorToast("Password must contain at least one uppercase letter");
			}
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[A-Z]/.test(data.password)) {
			errorToast("Password must contain at least one uppercase letter");
			if (!/[a-z]/.test(data.password)) {
				errorToast("Password must contain at least one lowercase letter");
			}
			return;
		}
		if (!/[a-z]/.test(data.password)) {
			errorToast("Password must contain at least one lowercase letter");
			return;
		}
		createUserEmailPassword(data.email, data.password)
			.then((userCredential) => {
				// Signed up
				console.log(userCredential);
				const createdAt = userCredential.user?.metadata?.creationTime;
				const user_email = userCredential.user.email;
				const firebase_uid = userCredential.user.uid;
				const tourist_spots = [];
				const newUser = {
					user_email,
					firebase_uid,
					tourist_spots,
					createdAt: createdAt,
				};
				fetch("https://b9a10-server-side-gazi-fayaz.vercel.app/user", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(newUser),
				});
				customizeProfile(data.name, data.photoUrl)
					.then((userCredential) => {
						console.log(userCredential);
						successToast("Registration Successful");
						window.location.reload();
						return <Navigate to="/" />;
					})
					.catch((error) => {
						console.log(error);
					});

				location.state ? navigate(location.state) : navigate(-1);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
				if (error.code === "auth/email-already-in-use") {
					errorToast("Email is already in use");
				}
			});
	};

	if (loading) {
		return (
			<div className="flex justify-center ">
				<Helmet>
					<title>GlobeGuide | Register</title>
				</Helmet>
				<span className="loading loading-spinner loading-lg text-accent-pink "></span>
			</div>
		);
	}

	console.log(watch("email"));
	return (
		<div className="flex-1 flex items-center">
			<Helmet>
				<title>GlobeGuide | Register</title>
			</Helmet>
			<form
				data-aos="fade-down"
				onSubmit={handleSubmit(onSubmit)}
				action=""
				className="mx-auto flex flex-col gap-4 w-full md:w-[500px] lg:min-w-[550px] lg:w-[2/3] items-center py-8 md:py-12 px-4 md:px-12 bg-accent-dark-blue rounded-2xl md:rounded-3xl"
			>
				<h1 className="text-3xl font-bold text-center text-white">Register</h1>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">Name</p>
					<input
						{...register("name", { required: true })}
						type="text"
						name="name"
						id="name"
						placeholder="Your Name"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full">
					<p className="text-xl font-semibold text-white mb-2">Email</p>
					<input
						{...register("email", { required: true })}
						type="email"
						name="email"
						id="email"
						placeholder="Your Email"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full flex flex-col">
					<p className="text-xl font-semibold text-white mb-2">Photo URL</p>
					<input
						{...register("photoUrl", { required: true })}
						type="text"
						name="photoUrl"
						id="photoUrl"
						placeholder="Photo Url"
						required
						className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
					/>
				</div>
				<div className="w-full flex flex-col">
					<p className="text-xl font-semibold text-white mb-2">Password</p>
					<div className="relative">
						<input
							{...register("password", {
								required: true,
							})}
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Your Password"
							required
							className="border-b-2 border-gray-400 w-full p-2 rounded-xl"
						/>
						{showPassword ? (
							<BsEyeFill
								className="absolute right-4 top-3 cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							></BsEyeFill>
						) : (
							<BsEyeSlashFill
								className="absolute right-4 top-3 cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}
							></BsEyeSlashFill>
						)}

						{/* {showPassword ? ():()}
						 */}
					</div>
				</div>
				<input
					type="submit"
					value={"Sign Up"}
					className="btn w-full text-xl border-none bg-accent-pink text-white"
				/>

				<p className="text-white w-full text-center mt-2">
					Already have an account?{" "}
					<Link
						to="/login"
						className="link link-hover text-accent-pink font-bold text-lg "
					>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
