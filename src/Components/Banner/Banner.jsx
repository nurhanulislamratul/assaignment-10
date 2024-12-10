import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect } from "react";

const Banner = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);
	return (
		<div data-aos="fade-down" className="w-full">
			<Swiper
				pagination={{
					dynamicBullets: true,
				}}
				loop={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
			>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(https://i.ibb.co/q5J8ZSL/french-riviera.jpg)] h-[70vh] rounded-3xl bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
						<h1 className="text-bg-light text-4xl md:text-5xl lg:text-6xl w-2/3 text-center font-semibold">
							Escape to Luxury
						</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(https://i.ibb.co/1KNXg5y/giethoorn-canal-netherlands.jpg)] h-[70vh] rounded-3xl bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
						<h1 className="text-bg-light  text-4xl md:text-5xl lg:text-6xl w-2/3 text-center font-semibold">
							Experience Tranquility
						</h1>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(https://i.ibb.co/RgQnDY8/Canals-Venice.jpg)] h-[70vh] rounded-3xl bg-cover bg-no-repeat bg-bottom flex items-center justify-center">
						<h1 className="text-bg-light  text-4xl md:text-5xl lg:text-6xl w-2/3 text-center font-semibold">
							Create Lasting Memories
						</h1>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Banner;
