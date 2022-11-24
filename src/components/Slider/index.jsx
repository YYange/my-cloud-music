import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { SwiperContainer } from "./style";
import "swiper/css/pagination";
import "swiper/css";

const Slider = (props) => {
  const { bannerList } = props;

  return (
    <SwiperContainer>
      <div className="before"></div>
      <Swiper
        className="slider-container"
        loop={true}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        spaceBetween={0}
      >
        <div className="swiper-wrapper">
          {bannerList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="swiper-nav">
                  <img src={item.imageUrl} alt="" width="100%" height="100%" />
                </div>
              </SwiperSlide>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </Swiper>
    </SwiperContainer>
  );
};

export default Slider;
