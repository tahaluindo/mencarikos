import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import CampaignItemList from '../components/CampaignItemList'
import Generateslug from '../utils/Generateslug'
import { BiChevronRight } from 'react-icons/bi'
class ListKosOthers extends Component {
    render() {
        const { data: listData, detail } = this.props
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="xs:border-t-8 mt-2 xl:mb-3">
                        <div className="mx-2">
                            <div className="pt-2 font-bold">
                                Kost Lain di {`${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}
                            </div>
                            <div className="divide-y">
                                {
                                    listData
                                        .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                        .slice(0, 10).map((item, index) => <div key={index}><CampaignItemList key={index} item={item} /></div>)
                                }
                            </div>
                            <div>
                                <Link href={`/area/${Generateslug(detail.location.district)}`} passHref>
                                    <div className="cursor-pointer align-middle text-center azure font-bold uppercase pt-3">Kost Lainnya <BiChevronRight size={24} className="ml-1 mb-1 inline" /></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}
ListKosOthers.propTypes = {
    data: arrayOf(shape({})),
    detail: shape({}),
    item: shape({})
}
ListKosOthers.defaultProps = {
    data: null,
    detail: null,
    item: null,
}
export default ListKosOthers