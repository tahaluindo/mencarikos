import React, { useState, Fragment, useEffect } from 'react'
import fire from '../configurations/firebase'
import Link from 'next/link'
import { bool } from 'prop-types'
import { BiMap } from 'react-icons/bi'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
// https://www.tailwindtoolbox.com/components/accordion
function ComponentCities({ onPage }) {
    const [stateCities, setStateCities] = useState(null)
    const [cities, setCities] = useState([])
    const [keyword, setKeyword] = useState("")
    const [load, setLoad] = useState(true)
    useEffect(async () => {
        let cities = []
        const querySnapshot = await fire.firestore().collection('provinces').get()
        const provinces = querySnapshot.docs.map(doc => doc.data())
        const listCities = provinces.map(item => item.city)
        listCities.forEach(item => {
            item.forEach(city => {
                cities.push({
                    name: city.name,
                    subdistrict: city.subdistrict,
                    is_popular: city.is_popular || false
                })
            })
        })
        setStateCities(cities)
        setCities(cities)
        setLoad(false)
    }, [cities])
    const handleFilter = (e) => {
        let keyword = e.target.value.toLowerCase()
        const filterCities = cities.filter(city => city.name.toLowerCase().indexOf(keyword) >= 0)
        setCities(filterCities)
        setKeyword(e.target.value)
        keyword === '' && setCities(stateCities)
    }
    let showcities = cities
    onPage && (showcities = cities.filter(city => city.is_popular))
    return (
        <div>
            {/* {
                !onPage &&
                <div className="flex border-b z-10 sticky top-0 bg-white">
                    <input className="w-full rounded p-2 my-3 mx-2 text-xl focus:outline-none border" id="name" type="text" placeholder="Kota/Kabupaten" value={keyword} onChange={handleFilter} />
                </div>
            } */}
            <div className="divide-y xs:mx-2">
                {
                    load ?
                        <div className="text-center mt-3">
                            <AiOutlineLoading3Quarters size={16} className="animate-spin inline mr-1 mb-1" />
                        </div>
                        :
                        <>
                            {

                                showcities
                                    .sort((a, b) => (a.name < b.name ? -1 : 1))
                                    .map((itemCity, index) =>
                                        <Fragment key={index}>
                                            <div className="tab w-full overflow-hidden">
                                                <input className="absolute opacity-0" id={index} type="checkbox" name="tabs" />
                                                <label htmlFor={index} className="py-2 block text-lg text-gray-800 font-bold cursor-pointer uppercase">
                                                    <BiMap className="inline mr-1 mb-1" size={16} /><span>{itemCity.name}</span>
                                                </label>
                                                <div className="tab-content overflow-hidden leading-normal divide-y">
                                                    {
                                                        itemCity?.subdistrict
                                                            .sort((a, b) => (a.name < b.name ? -1 : 1))
                                                            .map((item, index) =>
                                                                <Link href={`/area/${Generateslug(item.name)}`} key={index} passHref><div className="py-2 pl-2 cursor-pointer bg-gray-50 azure">{item.name}</div></Link>
                                                            )
                                                    }
                                                    <Link href={`/area/kota/${Generateslug(itemCity.name)}`} passHref>
                                                        <div className="align-middle text-center azure font-bold uppercase py-2 cursor-pointer">Lihat Semua <BiChevronRight size={24} className="ml-1 mb-1 inline" /></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                            }
                            {
                                onPage &&
                                <Link href="/area/id" passHref>
                                    <div className="cursor-pointer align-middle text-center azure font-bold uppercase py-3">Kota Lainnya <BiChevronRight size={24} className="ml-1 mb-1 inline" /></div>
                                </Link>
                            }
                        </>
                }
            </div>
        </div>
    )
}
ComponentCities.propTypes = { onPage: bool }
ComponentCities.defaultProps = { onPage: false }
export default ComponentCities