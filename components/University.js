import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { shape } from 'prop-types'
import fire from '../configurations/firebase'
import Message from './Message';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Generateslug from '../utils/Generateslug';
function University({ viewport, location }) {
    const [universities, setUniversities] = useState(null)
    const [load, setLoad] = useState(true)
    useEffect(() => {
        new Promise(async (resolve, reject) => {
            let provinces = []
            let universities = []
            const querySnapshot = await fire.firestore().collection('provinces')
                .where("name", "==", location.province).get()
            querySnapshot.forEach(doc => { provinces.push({ id: doc.id, ...doc.data() }) })
            provinces.length > 0 && (universities = setData(viewport, provinces[0].universities))
            resolve(universities)
        }).then(universities => {
            setUniversities(universities)
            setLoad(false)
        })
    }, [location.province, viewport])
    const setData = (viewport, data) => {
        let res = []
        if (data) {
            for (var i = 0; i < data.length; i++) {
                const latitude = data[i].latlng.latitude
                const longitude = data[i].latlng.longitude
                const distance = getDistance(viewport.latitude, viewport.longitude, latitude, longitude, "K")
                if (distance <= 2) res.push({ distance: parseFloat(distance).toFixed(1), name: data[i].name, slug: data[i].slug })
            }
        }
        return res
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
    return <div className="mb-3">
        {
            load &&
            <div className="text-center mt-1">
                <AiOutlineLoading3Quarters size={16} className="animate-spin inline mr-1 mb-1" />
            </div>
        }
        {
            universities && universities.length > 0 ?
                <div className="my-3">
                    <ul className="list-disc ml-4">
                        {
                            universities
                                .map((item, index) =>
                                    <Link href={`/area/kampus/${Generateslug(item.name)}?province=${Generateslug(location.province)}`} key={index} passHref>
                                        <li className="cursor-pointer mb-1 azure clamp-1">{`(${item.distance} km) ${item.name}`}</li>
                                    </Link>
                                )
                        }
                    </ul>
                </div>
                :
                !load && <Message message="Belum ada data kampus terdekat" />
        }
    </div>
}
University.propTypes = { viewport: shape({}) }
University.defaultProps = { viewport: null }
export default University