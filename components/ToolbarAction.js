import React, { useEffect, useState } from 'react'
import { shape } from 'prop-types'
import { FaWhatsapp } from 'react-icons/fa'
import { BiPhoneCall } from 'react-icons/bi'
import { BsImages } from 'react-icons/bs'
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
function ToolbarAction({ data, handleShowAllImage }) {
    const [like, setLike] = useState(false)
    useEffect(() => {
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === data.id).length
        if (findFav > 0) setLike(true)
    }, [data.id])
    const handleCall = (phone) => window.open('tel:' + phone)
    const handleFavorite = () => {
        setLike(!like)
        if (!like) {
            let fav = localStorage.getItem('favorites')
            let dataFav
            if (fav === null) { dataFav = [] } else { dataFav = JSON.parse(fav) }
            const findData = dataFav.filter(i => i.id === data.id).length
            const newData = {
                category: data.category,
                date_modified: data.date_modified,
                facility: { bathroom: data.facility.bathroom, building: data.facility.building, share: data.facility.share, room: data.facility.room },
                id: data.id,
                images: data.images,
                location: {
                    city: data.location.city, district: data.location.district, near: data.location.near, province: data.location.province
                },
                name: data.name,
                price: { start_from: data.price.start_from, duration: data.price.duration },
                slug: data.slug,
                title: data.title,
                type: data.type,
                hit: data.hit
            }
            if (findData === 0) {
                dataFav.push(newData)
                localStorage.setItem('favorites', JSON.stringify(dataFav))
            }
        } else {
            let userFav = localStorage.getItem('favorites')
            let userdataFav
            if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
            userdataFav = userdataFav.filter(i => i.id !== data.id)
            localStorage.setItem('favorites', JSON.stringify(userdataFav))
        }
    }
    return (
        <div className="xs:px-2 py-2">
            <div className="grid grid-cols-4 divide-x-8 divide-white">
                <div>
                    {
                        data.contact_us && data.contact_us.whatsapp !== undefined ?
                            <a href={`https://wa.me/${data.contact_us.whatsapp}/?text=Hai, saya tertarik dengan kost ini https://www.tantekos.com/${data.slug}`} target="_blank" rel="noreferrer">
                                <button className="w-full rounded-bl-lg xs:rounded-md shadow bg-green-500 hover:bg-green-400 text-white text-xs font-bold py-1 px-1 uppercase focus:outline-none"><div style={{ textAlign: '-webkit-center' }}><FaWhatsapp size={32} /></div>WhatsApp
                                </button></a>
                            :
                            <button className="w-full xs:rounded-md shadow bg-green-300 text-gray-800 text-xs font-bold py-1 px-1 opacity-50 cursor-not-allowed uppercase focus:outline-none"><div style={{ textAlign: '-webkit-center' }}><FaWhatsapp size={32} /></div>WhatsApp</button>
                    }
                </div>
                <div>
                    {
                        data.contact_us && data.contact_us.phone !== '' ?
                            <button className="w-full xs:rounded-md shadow bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold mr-1 py-1 px-1 uppercase focus:outline-none" onClick={() => handleCall(data.contact_us.phone)}>
                                <div style={{ textAlign: '-webkit-center' }}>
                                    <BiPhoneCall size={32} />
                                </div>
                                Telepon
                            </button>
                            :
                            <button className="w-full xs:rounded-md shadow bg-blue-500 text-white text-xs font-bold mr-1 py-1 px-3 opacity-50 cursor-not-allowed uppercase focus:outline-none">
                                <div style={{ textAlign: '-webkit-center' }}>
                                    <BiPhoneCall size={32} />
                                </div>
                                Telepon
                            </button>
                    }
                </div>
                <div>
                    <button className="w-full xs:rounded-md shadow bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold mr-1 py-1 uppercase focus:outline-none" onClick={handleFavorite}>
                        <div style={{ textAlign: '-webkit-center' }}>
                            {like ? <RiHeartFill className="text-white" size={32} /> :
                                <RiHeartLine className="text-white" size={32} />}
                        </div>
                        {like ? `Tersimpan` : `Simpan`}
                    </button>
                </div>
                <div>
                    <button className="w-full rounded-br-lg xs:rounded-md shadow bg-gray-700 hover:bg-gray-500 text-white text-xs font-bold mr-1 py-1 uppercase focus:outline-none" onClick={() => handleShowAllImage()}>
                        <div style={{ textAlign: '-webkit-center' }}>
                            <BsImages className="text-white" size={32} />
                        </div>
                        Foto
                    </button>
                </div>
            </div>
        </div >
    )
}
ToolbarAction.propTypes = { data: shape({}) }
ToolbarAction.defaultProps = { data: null }
export default ToolbarAction