import React from 'react'
import { arrayOf, func } from 'prop-types'
import CampaignItemList from './CampaignItemList'
import Generateslug from '../utils/Generateslug'
import fire from '../configurations/firebase'
import Message from './Message'
import CampaignItemListSkeleton from './CampaignItemListSkeleton'
import Link from 'next/link'
class FeedsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true,
            limit: 5
        }
    }
    async componentDidMount() {
        const { limit } = this.state
        const docRef = await fire
            .firestore().collection('kosts').orderBy('date_modified', 'desc').limit(limit)
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, load: false })
        })
        docRef.get().catch(err => console.log(err))
    }
    render() {
        const { data, limit, load } = this.state
        const { filterData, dataCallback } = this.props
        let url = '/search/all'
        if (filterData && filterData.length > limit) {
            if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province)
            }
            else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province) + '&city=' + Generateslug(dataCallback.city)
            } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
                url = '/search/' + dataCallback.duration.toLowerCase() + '?province=' + Generateslug(dataCallback.province) + '&city=' + Generateslug(dataCallback.city) + '&district=' + Generateslug(dataCallback.district)
            }
        }
        return (
            <div className="mb-3">
                {
                    filterData ? <>
                        {
                            filterData.length > 0 ?
                                <>
                                    <div className="mx-3 divide-y">
                                        {
                                            filterData.slice(0, limit).map((item, index) => <CampaignItemList key={index} item={item} />)
                                        }
                                    </div>
                                    <Link href={url} passHref>
                                        <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3">
                                            {
                                                filterData.length > limit ? <span>Lihat {filterData.length - limit} Kost Lainnya</span> : <span>Cari Lebih Banyak</span>
                                            }
                                        </div>
                                    </Link>
                                </>
                                :
                                <Message title="Tidak Ditemukan" message="Silahkan cari dengan kriteria lainnya" />
                        }
                    </> : load ? <CampaignItemListSkeleton /> :
                        <div className="mx-3 divide-y">
                            {!load && data && data
                                .map((item, index) => <CampaignItemList key={index} item={item} />)}
                        </div>
                }
            </div>
        )
    }
}
FeedsList.propTypes = { filterData: arrayOf(), dataCallback: func }
FeedsList.defaultProps = { filterData: null, dataCallback: null }
export default FeedsList