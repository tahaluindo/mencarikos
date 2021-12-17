/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import moment from 'moment'
import 'moment/locale/id'
import { shape, string } from 'prop-types'
import { type } from './Campaign'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { BiMap, BiChevronRight, BiHomeHeart } from 'react-icons/bi'
import { BsCheckCircle } from 'react-icons/bs'
import { FaRegPlayCircle } from 'react-icons/fa'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import YoutubeEmbed from './YoutubeEmbed';
function CampaignItem({ item, customStyle }) {
    const [like, setLike] = useState(false)
    const [showvideo, setShowvideo] = useState(false)
    useEffect(() => {
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === item.id).length
        if (findFav > 0) setLike(true)
    }, [item.id])
    const handleFavorite = () => {
        setLike(!like)
        if (!like) {
            let fav = localStorage.getItem('favorites')
            let dataFav
            if (fav === null) { dataFav = [] } else { dataFav = JSON.parse(fav) }
            const findData = dataFav.filter(i => i.id === item.id).length
            const newData = {
                category: item.category,
                date_modified: item.date_modified,
                facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
                id: item.id,
                images: item.images,
                location: {
                    city: item.location.city, district: item.location.district, near: item.location.near, province: item.location.province
                },
                name: item.name,
                price: { start_from: item.price.start_from, duration: item.price.duration },
                slug: item.slug,
                title: item.title,
                type: item.type,
                hit: item.hit
            }
            if (findData === 0) {
                dataFav.push(newData)
                localStorage.setItem('favorites', JSON.stringify(dataFav))
            }
        } else {
            let userFav = localStorage.getItem('favorites')
            let userdataFav
            if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
            // remove data from array
            userdataFav = userdataFav.filter(i => i.id !== item.id)
            localStorage.setItem('favorites', JSON.stringify(userdataFav))
        }
    }
    const handleLastView = () => {
        const newItem = {
            category: item.category,
            date_modified: item.date_modified,
            facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
            id: item.id,
            images: item.images,
            location: {
                city: item.location.city, district: item.location.district, near: item.location.near, province: item.location.province
            },
            name: item.name,
            price: { start_from: item.price.start_from, duration: item.price.duration },
            slug: item.slug,
            title: item.title,
            type: item.type,
            hit: item.hit
        }
        let lastView = localStorage.getItem('lastview')
        let data
        if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
        const findData = data.filter(i => i.id === newItem.id).length
        if (data.length > 14) { data.shift() }
        if (findData === 0) {
            data.push(newItem)
            localStorage.setItem('lastview', JSON.stringify(data))
        }
    }
    const handleShowVideo = () => setShowvideo(!showvideo)
    let titleName = 'Tantekos'
    if (item?.user?.email !== process.env.NEXT_PUBLIC_REACT_APP_EMAIL) {
        titleName = item?.user?.display_name || 'Tantekos'
    } else if (item?.verified) {
        titleName = item?.name
    }
    return (
        <div className={`lg:shadow mt-4 mb-2 overflow-hidden ${customStyle}`}>
            <div className="mx-2 mb-2">
                <div className="flex">
                    <div className="flex-auto">
                        <div className="flex">
                            <BiHomeHeart className="text-gray-600 mt-1 mr-2 bg-gray-200 rounded-md" size={41} />
                            <div>
                                <div className={`font-bold my-n1 ${item?.verified ? 'text-green-600' : 'text-gray-600'}`}>
                                    {titleName === 'Tantekos' ? `Kost ${item.location.district}` : titleName}
                                    {item?.verified && <BsCheckCircle className="inline ml-1 mb-1" />}
                                </div>
                                <div>
                                    <small className="text-gray-700 uppercase">
                                        {
                                            item?.sponsored?.display ?
                                                <span className="text-indigo-500 font-bold">
                                                    Sponsor
                                                </span>
                                                :
                                                <>
                                                    {moment(item.date_modified).fromNow()} &middot; {Cash(item?.hit || 0)} Kali Dilihat
                                                </>
                                        }
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="float-right cursor-pointer mt-1" onClick={handleFavorite}>
                        {like ? <RiHeartFill className="text-pink-600" size={32} /> :
                            <RiHeartLine className="text-gray-600" size={32} />}
                    </span>
                </div>
            </div>
            {
                item?.video?.youtube ?
                    <div onClick={handleShowVideo}>
                        {
                            showvideo ?
                                <YoutubeEmbed title={item.title} embedId={item?.video?.youtube} />
                                :
                                <div style={{ backgroundImage: `url("https://cdn.statically.io/img/i.imgur.com/q=20/${item.images[0]}")` }} className="flex h-52 lg:h-80 object-cover items-center justify-center bg-cover bg-center">
                                    <FaRegPlayCircle size={60} className="text-white opacity-60 absolute mx-1 mb-1 cursor-pointer" />
                                </div>
                        }
                    </div>
                    :
                    <div className="bg-gray-400 relative">
                        <img className="w-full h-52 lg:h-80 object-cover" src={`https://cdn.statically.io/img/i.imgur.com/q=20/${item.images[0]}`} alt={item.title} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </div>
            }
            <div className="mx-2 my-1">
                <div className="flex border-b">
                    <div className="flex-auto font-bold text-2xl my-2">
                        {Cash(item.price.start_from)}
                        <span className="ml-1 text-lg text-gray-600">
                            /{item.price.duration}
                        </span>
                    </div>
                    <a className="hover:text-current" href={`/${Generateslug(item.title)}`} onClick={handleLastView}>
                        <div className="text-lg uppercase azure font-bold pl-2 mt-2">Selengkapnya<BiChevronRight size={24} className="mb-1 inline" /></div>
                    </a>
                </div>
                <div className="clamp-1 my-1">
                    <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}<BiChevronRight className="inline mb-1" />{item.location.city}<BiChevronRight className="inline mb-1" />{item.location.province}</span>
                </div>
                <div className="text-sm uppercase text-green-600 font-bold">{type(item.type)}</div>
            </div>
        </div>
    )
}
CampaignItem.propTypes = {
    item: shape({}),
    customStyle: string
}
CampaignItem.defaultProps = {
    item: null,
    customStyle: null
}
export default CampaignItem;