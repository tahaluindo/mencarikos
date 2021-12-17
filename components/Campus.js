import React, { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { bool, arrayOf, shape } from 'prop-types'
import { BiMap } from 'react-icons/bi'
import Generateslug from '../utils/Generateslug'
function ComponentCampus({ onPage, provinces }) {
    const [listprovinces, setListProvinces] = useState(null)
    const [stateProvinces, setStateProvinces] = useState(null)
    const [keyword, setKeyword] = useState("")
    useEffect(() => {
        setListProvinces(provinces)
        setStateProvinces(provinces)
    }, [provinces])
    const handleFilter = (e) => {
        let keyword = e.target.value.toLowerCase()
        const newProvinces = provinces.filter(province => province.name.toLowerCase().indexOf(keyword) >= 0)
        setListProvinces(newProvinces)
        setKeyword(e.target.value)
        keyword === '' && setListProvinces(stateProvinces)
    }
    return (
        <div>
            {
                onPage ?
                    <h2 className="xs:mx-2 my-3 text-2xl text-uppercase text-current font-bold">Kampus Terdekat</h2>
                    :
                    <div className="flex border-b z-10 sticky top-0 bg-white">
                        <input className="w-full rounded p-2 my-3 mx-2 text-xl focus:outline-none border" id="name" type="text" placeholder="Provinsi" value={keyword} onChange={handleFilter} />
                    </div>
            }
            <div className="divide-y xs:mx-2">
                {
                    listprovinces && listprovinces
                        .sort((a, b) => (a.name < b.name ? -1 : 1))
                        .map((province, index) =>
                            <Fragment key={index}>
                                <div className="tab w-full overflow-hidden">
                                    <input className="absolute opacity-0" id={index} type="checkbox" name="tabs" />
                                    <label htmlFor={index} className="py-2 block text-lg text-gray-800 font-bold cursor-pointer uppercase">
                                        <BiMap className="inline mr-1 mb-1" size={16} /><span>{province.name}</span>
                                    </label>
                                    <div className="tab-content overflow-hidden leading-normal divide-y">

                                        {
                                            province.universities && province.universities
                                                .sort((a, b) => (a.name < b.name ? -1 : 1))
                                                .map((campus, index) =>
                                                    <Link href={`/area/kampus/${Generateslug(campus.name)}?province=${Generateslug(province.name)}`} key={index} passHref><div className="py-2 pl-2 cursor-pointer bg-gray-50 azure">{campus.name}</div></Link>
                                                )
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        )
                }
            </div>
            {
                onPage &&
                <Link href="/area/kota" passHref>
                    <div className="cursor-pointer align-middle text-center azure font-bold uppercase py-3">Kota Lainnya</div>
                </Link>
            }
        </div>
    )
}
ComponentCampus.propTypes = { onPage: bool, provinces: arrayOf(shape({})) }
ComponentCampus.defaultProps = { onPage: false, provinces: null }
export default ComponentCampus