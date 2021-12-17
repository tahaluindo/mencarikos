import React from 'react'
import { array, bool } from 'prop-types'
import { BiBath, BiBed, BiCloset, BiChair, BiCar, BiWifi, BiWind, BiTv, BiDish, BiDonateBlood } from 'react-icons/bi'
import { FaToilet, FaShower, FaToiletPaper, FaFan } from 'react-icons/fa'
import { RiParkingBoxLine } from 'react-icons/ri'
import { GiTable, GiComputerFan, GiHeatHaze, GiShower, GiBed, GiFlowerPot } from 'react-icons/gi'
import { CgSmartHomeWashMachine } from 'react-icons/cg'
import { ImDrawer } from 'react-icons/im'
export function Room({ items }) {
    const facility = ['Kamar Mandi Dalam', 'AC', 'Wifi', 'Springbed', 'Kasur', 'Lemari Pakaian', 'Meja', 'Kursi', 'Exhaust Fan', 'Kipas Angin', 'TV', 'Dapur']
    return (
        <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
            {
                items.map((item, index) =>
                    facility.includes(item) &&
                    < div key={index} className="ml-n2 mb-n2 px-1 py-1 border-2 rounded-b-md text-xs text-green-600 font-bold" >
                        {item === 'Kamar Mandi Dalam' && <div style={{ textAlign: '-webkit-center' }}><GiShower size={28} />KM Dalam</div>}

                        {item === 'AC' && <div style={{ textAlign: '-webkit-center' }}><BiWind size={28} />AC</div>}

                        {item === 'Kasur' && <div style={{ textAlign: '-webkit-center' }}><GiBed size={28} />Kasur</div>}

                        {item === 'Springbed' && <div style={{ textAlign: '-webkit-center' }}><BiBed size={28} />Springbed</div>}

                        {item === 'Lemari Pakaian' && <div style={{ textAlign: '-webkit-center' }}><ImDrawer size={28} />Lemari</div>}

                        {item === 'Meja' && <div style={{ textAlign: '-webkit-center' }}><GiTable size={28} />Meja</div>}

                        {item === 'Kursi' && <div style={{ textAlign: '-webkit-center' }}><BiChair size={28} />Kursi</div>}

                        {item === 'Wifi' && <div style={{ textAlign: '-webkit-center' }}><BiWifi size={28} />Wifi</div>}

                        {item === 'Exhaust Fan' && <div style={{ textAlign: '-webkit-center' }}><GiComputerFan size={28} />Exhaust</div>}

                        {item === 'TV' && <div style={{ textAlign: '-webkit-center' }}><BiTv size={28} />TV</div>}

                        {item === 'Kipas Angin' && <div style={{ textAlign: '-webkit-center' }}><FaFan size={28} />Kipas</div>}

                        {item === 'Dapur' && <div style={{ textAlign: '-webkit-center' }}><BiDish size={28} />Dapur Mini</div>}
                    </div>
                )
            }
        </div>
    )
}
export function Bathroom({ items }) {
    const facility = ['Shower', 'Water Heater', 'Bathtub', 'Wastafel', 'Kloset Duduk', 'Kloset Jongkok']
    return (
        <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
            {
                items.map((item, index) =>
                    facility.includes(item) &&
                    < div key={index} className="ml-n2 mb-n2 px-1 py-1 border-2 rounded-b-md text-xs text-green-600 font-bold" >
                        {item === 'Shower' && <div style={{ textAlign: '-webkit-center' }}><FaShower size={28} />Shower</div>}

                        {item === 'Water Heater' && <div style={{ textAlign: '-webkit-center' }}><GiHeatHaze size={28} />Air Panas</div>}

                        {item === 'Wastafel' && <div style={{ textAlign: '-webkit-center' }}><BiDonateBlood size={28} />Wastafel</div>}

                        {item === 'Bathtub' && <div style={{ textAlign: '-webkit-center' }}><BiBath size={28} />Bathtub</div>}

                        {item === 'Kloset Duduk' && <div style={{ textAlign: '-webkit-center' }}><FaToilet size={28} />Kl Duduk</div>}

                        {item === 'Kloset Jongkok' && <div style={{ textAlign: '-webkit-center' }}><FaToiletPaper size={28} />Kl Jongkok</div>}
                    </div>
                )
            }
        </div>
    )
}
export function Share({ items }) {
    const facility = ['Parkir Mobil', 'Parkir Motor', 'R.Jemur', 'R.Cuci', 'R.Tamu', 'Kamar Mandi Luar', 'Dapur']
    return (
        <div className="grid grid-cols-3 gap-4 mx-2 mt-2">
            {
                items.map((item, index) =>
                    facility.includes(item) &&
                    < div key={index} className="ml-n2 mb-n2 px-1 py-1 border-2 rounded-b-md text-xs text-green-600 font-bold" >
                        {item === 'Parkir Motor' && <div style={{ textAlign: '-webkit-center' }}><RiParkingBoxLine size={28} />P Motor</div>}

                        {item === 'Parkir Mobil' && <div style={{ textAlign: '-webkit-center' }}><BiCar size={28} />P Mobil</div>}

                        {item === 'R.Jemur' && <div style={{ textAlign: '-webkit-center' }}><BiCloset size={28} />Rg Jemur</div>}

                        {item === 'R.Cuci' && <div style={{ textAlign: '-webkit-center' }}><CgSmartHomeWashMachine size={28} />Rg Cuci</div>}

                        {item === 'R.Tamu' && <div style={{ textAlign: '-webkit-center' }}><GiFlowerPot size={28} />Rg Tamu</div>}

                        {item === 'Kamar Mandi Luar' && <div style={{ textAlign: '-webkit-center' }}><GiShower size={28} />KM Luar</div>}

                        {item === 'Dapur' && <div style={{ textAlign: '-webkit-center' }}><BiDish size={28} />Dapur</div>}
                    </div>
                )
            }
        </div>
    )
}
function Text({ items }) {
    return (
        <div className="clamp-1">
            {
                items.map((item, index) =>
                    <span key={item} className="text-md">{index !== 0 && <>&middot;</>} {item}&nbsp;
                    </span>
                )
            }
        </div>
    )
}
Room.propTypes = {
    items: array,
    inline: bool
}
Room.defaultProps = {
    items: null,
    inline: false
}
export default Room