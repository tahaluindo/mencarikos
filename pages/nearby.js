import React from 'react'
import { string } from 'prop-types'
import fire from '../configurations/firebase'
import Message from '../components/Message'
import Header from '../components/Header'
import CampaignItem from '../components/CampaignItem'
import CampaignItemSkeleton from '../components/CampaignItemSkeleton'
import Histories from '../components/Histories'
class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = { nearbyList: null }
        this.showAlert = this.showAlert.bind(this)
        this.getDistance = this.getDistance.bind(this)
        this.successfulLookup = this.successfulLookup.bind(this)
    }
    componentDidMount() {
        if (typeof window !== 'undefined' && window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(
                this.successfulLookup, this.showAlert
            )
        }
    }
    showAlert() { console.log('Your location is unknown!') }
    getDistance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
        if (dist > 1) dist = 1
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        if (unit == "K") dist = dist * 1.609344
        if (unit == "N") dist = dist * 0.8684
        return dist
    }
    successfulLookup(position) {
        const { latitude, longitude } = position.coords
        const { kosts } = this.props
        const data = JSON.parse(kosts)
        let nearbyList = []
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(latitude, longitude, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 2) nearbyList.push({
                distance: (d).toFixed(1),
                date_modified: data[i].date_modified,
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type,
                hit: data[i].hit
            })
        }
        this.setState({ nearbyList })
    }
    render() {
        const { nearbyList } = this.state
        const seo = {
            title: 'Nearby - Kost Terdekat Dari Lokasi Saya | Tantekos',
            description: 'Daftar Kost & Kontrakan Murah Terdekat Dari Lokasi Saya',
            url: 'nearby',
            keyword: 'kost terdekat, kost murah terdekat, kosan murah terdekat, kost kost an terdekat',
            image: 'i2aQSZ9'
        }
        return <>

            <Header seo={seo} />

            <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-2">
                <div>
                    <h1 className="text-xl font-bold p-2 xs:mt-3">Kost Terdekat</h1>
                    <div className="gcse-search"></div>
                    {!nearbyList && <CampaignItemSkeleton />}
                    {
                        nearbyList && nearbyList.length > 0 &&
                        <div>
                            <h2 className="p-2 font-bold bg-white">
                                {nearbyList.length} Kost terdekat dari lokasi Kamu
                            </h2>
                            {nearbyList.map((item, index) =>
                                <div key={index}><CampaignItem item={item} /></div>
                            )}
                        </div>
                    }
                    {
                        nearbyList && nearbyList.length === 0 &&
                        <div className="mt-3">
                            <Message title="Tidak ada" message="Belum ada data kost di sekitar lokasi Kamu" />
                        </div>
                    }
                </div>
                <div>
                    <Histories />
                </div>
            </div>
        </>
    }
}
export const getServerSideProps = async () => {
    let kosts = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where('is_active', '==', true)
        .get()
    querySnapshot.forEach(doc => {
        kosts.push({
            id: doc.id,
            ...doc.data()
        })
    })
    return {
        props: {
            kosts: JSON.stringify(kosts)
        }
    }
}
Nearby.propTypes = {
    kosts: string
}
Nearby.defaultProps = {
    kosts: null
}
export default Nearby