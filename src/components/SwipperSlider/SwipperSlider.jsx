import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import Review from '../Review/Review';
import './swipperSlider.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cards';

function SwipperSlider({ items })
{
    return (
        <div className='slider'>
            <h2>Отзывы</h2>
            <Swiper
                className="swiper_container"
                effect={'cards'}
                // effect={'coverflow'}
                centeredSlidesBounds={true}
                // grabCursor={true}
                centeredSlides={false}
                centerInsufficientSlides={true}
                loop={true}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                spaceBetween={60}
                slidesPerView={2}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {
                    items.map(item => (
                        <SwiperSlide key={item.id}><Review data={item} /></SwiperSlide>
                    ))
                }
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>

        </div>
    );
}

export default SwipperSlider