/* eslint-disable no-undef */
import React from 'react'
import { string } from 'prop-types'
import Geocoder from 'react-mapbox-gl-geocoder'
import Message from '../components/Message'
import fire from '../configurations/firebase'
import Header from '../components/Header'
import ListComponent from '../components/ListComponent'
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: null,
            listResult: null,
            placeName: null,
            viewport: {
                latitude: -7.780471209178254,
                longitude: 110.41408899968006
            }
        }
        this.setData = this.setData.bind(this)
        this.onSelected = this.onSelected.bind(this)
        this.getDistance = this.getDistance.bind(this)
    }
    componentDidMount() {
        const input = document.getElementsByTagName("input")[0]
        input.setAttribute("placeholder", "Location/Area/Address")
        input.select()
    }
    setData(viewport) {
        const { kosts } = this.props
        const data = JSON.parse(kosts)
        let res = []
        for (var i = 0; i < data.length; i++) {
            const d = this.getDistance(viewport.latitude, viewport.longitude, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 2) res.push({
                facility: data[i].facility,
                images: data[i].images,
                location: data[i].location,
                name: data[i].name,
                price: data[i].price,
                slug: data[i].slug,
                title: data[i].title,
                type: data[i].type
            })
        }
        return res
    }
    onSelected(viewport, item) {
        const { keyword } = this.state
        this.setState({
            listResult: this.setData(viewport),
            placeName: item.place_name,
            keyword: keyword
        })
    }
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
    render() {
        const { viewport, listResult, placeName } = this.state
        const mapboxApiKey = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
        const seo = {
            title: 'Pencarian - Cari Kost Murah Terdekat | Tantekos.com',
            description: 'Pencarian Kost & Kontrakan Murah Terdekat.',
            url: 'search',
            keyword: 'search, cari kost, kost murah, kost terdekat',
            image: 'i2aQSZ9'
        }
        return (
            <>
                <Header seo={seo} />
                <div className="my-2">
                    <Geocoder
                        className="border text-lg mx-2 p-0"
                        mapboxApiAccessToken={mapboxApiKey}
                        onSelected={this.onSelected}
                        viewport={viewport}
                        hideOnSelect={true}
                        queryParams={{ country: "id" }} />
                </div>
                <div>
                    <h1 className="my-2 mx-2">
                        {
                            listResult &&
                            <>
                                <span className="font-bold">
                                    {listResult.length > 0 && `${listResult.length} Kost`}
                                    {listResult.length > 0 && placeName && ' dekat ' + placeName}
                                </span>
                                {listResult.length === 0 && placeName && <Message title="Tidak ada" message={`Tidak ada kost di dekat ${placeName}`} />}
                            </>
                        }
                    </h1>

                    {
                        listResult && listResult.length > 0 &&
                        <div className="mx-2">
                            <ListComponent data={listResult} />
                        </div>
                    }

                </div>
            </>
        )
    }
}
export const getServerSideProps = async () => {
    let kosts = []
    const querySnapshot = await fire.firestore().collection('kosts')
        .where('is_active', '==', true).get()
    querySnapshot.forEach(doc => {
        kosts.push({ id: doc.id, ...doc.data() })
    })
    return {
        props: { kosts: JSON.stringify(kosts) }
    }
}
Search.propTypes = {
    kosts: string
}
Search.defaultProps = {
    kosts: null
}
export default Search