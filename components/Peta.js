/* eslint-disable no-undef */
import React, { useState } from 'react'
import ReactMapGl, { FullscreenControl, GeolocateControl, Marker } from 'react-map-gl'
import { shape, number } from 'prop-types'
import { FaMapMarkerAlt } from 'react-icons/fa';
export default function Peta(props) {
    // const [windowWIdth, setWindowWidth] = useState(null)
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         setWindowWidth(window.innerWidth)
    //     }
    // })
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    const mapStyle = "mapbox://styles/buqento/ckg4bb6cc2hrr19k84gzrs97j"
    const lat = parseFloat(props.location.lat_lng.latitude)
    const long = parseFloat(props.location.lat_lng.longitude)
    const zoom = parseInt(props.zoom)
    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        width: "100%",
        height: 200,
        zoom: zoom
    })
    viewport.width = "100%"
    // viewport.height = windowWIdth > 768 ? 300 : 200
    viewport.height = 200
    return (
        <ReactMapGl
            {...viewport}
            mapboxApiAccessToken={accessToken}
            onViewportChange={viewport => { setViewport(viewport) }}
            mapStyle={mapStyle}
        >
            <div className="ml-2 mt-2" style={{ width: '29px', zIndex: -1 }}>
                <FullscreenControl label="Perbesar Peta" />
            </div>
            <div className="ml-2 mt-2" style={{ width: '29px' }}>
                <GeolocateControl
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    label="Lokasi Anda"
                />
            </div>
            <Marker
                latitude={lat}
                longitude={long}
                offsetLeft={-18}
                offsetTop={-25}
            >
                <FaMapMarkerAlt size={30} className="text-red-700" />
            </Marker>
        </ReactMapGl>
    )
}
Peta.propTypes = {
    location: shape({}),
    zoom: number
}