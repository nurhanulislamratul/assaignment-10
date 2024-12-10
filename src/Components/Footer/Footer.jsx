/* eslint-disable react/no-unescaped-entities */
const Footer = () => {
	return (
		<div className="mt-8 md:mt-12 lg:mt-24  md:p-10  bg-accent-cyan border-t-slate-950 border-2 text-base-content md:px-12 lg:px-24 p-4 w-full flex flex-col items-center gap-8">
			<footer className="footer w-full">
				<form className="w-full" >
					<p className="text-xl font-bold">
						GlobeGuide Inc.
					</p>
					<h6 className="footer-title">About Us</h6>
					<p className="lg:w-80 text-justify">
          Welcome to GlobalGuide, your trusted companion in exploring the world's wonders. With our passion for travel and commitment to seamless experiences, we strive to empower every adventurer to journey with confidence. Let's embark on unforgettable adventures together.
					</p>
					<fieldset className="form-control w-80">
						<label className="label">
							<span className="label-text">Enter your email address</span>
						</label>
						<div className="join">
							<input
								type="text"
								placeholder="username@site.com"
								className="input input-bordered join-item w-1/2 md:w-auto"
							/>
							<button className="btn bg-[#5356FF] join-item text-[#DFF5FF] p-0 tex">
								Subscribe
							</button>
						</div>
					</fieldset>
				</form>
				<nav>
					<h6 className="footer-title">Social Media</h6>
					<a className="link link-hover">Facebook</a>
					<a className="link link-hover">Instagram</a>
					<a className="link link-hover">Twitter</a>
					<a className="link link-hover">Telegram</a>
				</nav>
				<nav className="gap-2">
					<h6 className="footer-title">Contact Us</h6>
					<div className="flex flex-col gap-4">
						<div>
							<p>256, 1st AVE, Manchester</p>
							<p>125 , North England</p>
						</div>
						<div>
							<p>Telephone : +012 345 678 102</p>
							<p>Telephone : +013 445 678 155</p>
						</div>
						<div>
							<p>
								Email : <a className="link link-hover">info@globalguide.com</a>
							</p>
							<p>
								Web : <a className="link link-hover">www.globalguide.com</a>
							</p>
						</div>
					</div>
				</nav>
			</footer>
			<p className="w-full text-center">
				Copyright © 2024 - All right reserved
			</p>
		</div>
	);
};

export default Footer;
