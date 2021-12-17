import React from 'react'
import { string } from 'prop-types'
import { Campus } from '../utils/modals/Campus'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
import Link from 'next/link'
const CampusList = (props) => {
    const { name, locationProvince } = props
    const filterItems = (keyword) => {
        let query = keyword.toLowerCase()
        return Campus.filter(item => item.name.toLowerCase().indexOf(query) >= 0 && item.province === locationProvince)
    }
    const data = filterItems(name)
    return (
        <>
            <div>
                {
                    data.length > 0 &&
                    <div className="pt-2 text-lg font-bold uppercase px-2">
                        {locationProvince}
                    </div>
                }
                <div className="divide-y mx-2">
                    {
                        data.length > 0 && data
                            .sort((a, b) => (a.name < b.name ? -1 : 1))
                            .map((item, index) =>
                                <div className="pb-2 pt-3" key={index}>
                                    <Link href={`../../area/kampus/${Generateslug(item.name)}`} passHref>
                                        <div className="flex cursor-pointer">
                                            <span className="w-full">{item.name}</span>
                                            <span className="ml-0.5 float-right self-center"><BiChevronRight size={24} className="inline ml-1 mb-1" /></span>
                                        </div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </>
    )
}
CampusList.propTypes = {
    name: string,
    locationProvince: string
}
CampusList.defaultProps = {
    name: null,
    locationProvince: null
}
export default CampusList