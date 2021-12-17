/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { string, func } from 'prop-types'
import Geocoder from 'react-mapbox-gl-geocoder'

function Search({ data, searchCallBack }) {
    const viewport = {
        latitude: -7.780471209178254,
        longitude: 110.41408899968006
    }

    const mapboxApiKey = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    const setData = (viewport) => {
        let res = []
        for (var i = 0; i < data.length; i++) {
            const d = getDistance(viewport.latitude, viewport.longitude, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
            if (d <= 1) res.push({
                date_modified: data[i].date_modified,
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
        return res
    }

    const onSelected = (viewport, item) => {
        const data = setData(viewport)
        searchCallBack(data, item.place_name)
    }

    const getDistance = (lat1, lon1, lat2, lon2, unit) => {
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

    useEffect(() => {
        const input = document.getElementsByTagName("input")[0]
        input.setAttribute("placeholder", "Cari kost sekitar lokasi/area/alamat")
        input.select()
    }, [])

    return (
        <Geocoder
            className="border text-lg xs:mx-2 my-4 rounded"
            mapboxApiAccessToken={mapboxApiKey}
            onSelected={onSelected}
            viewport={viewport}
            hideOnSelect={true}
            queryParams={{ country: "id" }} />
    )
}

Search.propTypes = {
    kosts: string,
    searchCallBack: func
}

Search.defaultProps = {
    kosts: null,
    searchCallBack: null
}

export default Search