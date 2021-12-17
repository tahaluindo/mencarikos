import React, { useEffect, useState } from 'react'
import Message from '../components/Message'
import CampaignItemSkeleton from '../components/CampaignItemSkeleton'
import CampaignItemList from './CampaignItemList'
function Histories() {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)
    useEffect(() => {
        let userFav = localStorage.getItem('lastview')
        if (userFav) setData(JSON.parse(userFav))
        setLoad(false)
    }, [])
    return (
        <>
            {
                load ? <CampaignItemSkeleton /> :
                    data && data.length > 0 &&
                    <>
                        <h2 className="text-xl font-bold p-2 xs:mt-3">Terakhir Dilihat</h2>
                        <div className="divide-y-2 mx-2">
                            {
                                data
                                    .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                    .map((item, index) =>
                                        <div key={index}>
                                            <CampaignItemList item={item} />
                                        </div>
                                    )
                            }
                        </div>
                    </>
            }
            {data && data.length === 0 && <Message title="Tidak ada" message="Belum ada histori pencarian" />}
        </>
    )
}
export default Histories