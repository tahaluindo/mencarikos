import React from 'react'
import Message from '../components/Message'
import CampaignItemSkeleton from '../components/CampaignItemSkeleton'
import Header from '../components/Header'
import CampaignItem from '../components/CampaignItem'
import Histories from '../components/Histories'
class Favorites extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('favorites')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data, load: false })
    }
    render() {
        const { data, load } = this.state
        const seo = {
            title: 'Favorit - Kost Favorit | Tantekos',
            description: 'Kost Favorit',
            url: 'favorites',
            keyword: 'kost favorit, kost favorit saya',
            image: 'i2aQSZ9'
        }
        return (
            <>
                <Header seo={seo} />

                <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4">

                    <div className="divide-y">
                        <h1 className="text-xl font-bold p-2 xs:mt-3">Kost Favorit</h1>
                        {
                            load ? <CampaignItemSkeleton /> :
                                data && data.length > 0 &&
                                <div className="xs:divide-y-8 divide-gray-500">
                                    {
                                        data && data
                                            .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                            .map((item, index) =>
                                                <div key={index}><CampaignItem key={index} item={item} /></div>
                                            )
                                    }
                                </div>
                        }
                        {data && data.length === 0 && <Message title="Tidak ada" message="Kamu belum memiliki kost favorit" />}
                    </div>

                    <div>
                        <Histories />
                    </div>

                </div>
            </>
        )
    }
}
export default Favorites