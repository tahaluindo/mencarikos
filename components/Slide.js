import React from 'react'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
export default function Slide({ images }) {
    let windowWidth = 0
    if (typeof window !== 'undefined') windowWidth = window.innerWidth
    // const [list, setList] = useState([])
    // const showAll = () => setList(images)
    // useEffect(() => { setList(images.slice(0, 3)) }, [])
    return <Swiper
        spaceBetween={0}
        slidesPerView={windowWidth <= 768 ? 1 : 3}
        pagination={{ clickable: true }}
        autoplay
        loop
        navigation
    >
        {
            images.map((item, index) =>
                <SwiperSlide key={index} className="bg-gray-900">
                    <div>
                        <img
                            className="w-full h-96 object-cover"
                            src={`https://cdn.statically.io/img/i.imgur.com/${item}`}
                            alt={item} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </div>
                </SwiperSlide>
            )
        }
    </Swiper>
}