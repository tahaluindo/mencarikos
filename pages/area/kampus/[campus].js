/* eslint-disable no-undef */
import React from 'react'
import { string, shape } from 'prop-types'
import Message from '../../../components/Message'
import fire from '../../../configurations/firebase'
import NextHead from 'next/head'
import CampaignItem from '../../../components/CampaignItem'
import Titlecase from '../../../utils/Titlecase'
import Generateslug from '../../../utils/Generateslug'
import Histories from '../../../components/Histories'
class University extends React.Component {
    render() {
        const { slug, province, list } = this.props
        const campusName = Titlecase(slug)
        const listResult = JSON.parse(list)
        const structureTypeBreadcrumbList =
            `{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@id": "https://www.tantekos.com/",
                        "name": "Tantekos"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@id": "https://www.tantekos.com/area",
                        "name": "Area"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@id": "https://www.tantekos.com/area/kampus",
                        "name": "Kampus"
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@id": "https://www.tantekos.com/area/kampus/${slug}",
                        "name": "${campusName}"
                    }
                }
            ]
           }`
        const structureTypeItemList =
            `{
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Dekat Kampus ${campusName}",
                "itemListElement": [
                    ${listResult.map((item, index) => `{
                        "@type": "ListItem",
                        "position": ${index + 1},
                        "url": "https://www.tantekos.com/${item.slug}"
                    }`)}
                ]
            }`
        const structureAreaPage = {
            '@graph': [
                JSON.parse(structureTypeItemList),
                JSON.parse(structureTypeBreadcrumbList)
            ]
        }
        const images = listResult[0].images[0]
        const seo = {
            title: `Kost Dekat ${campusName} - Ada ${listResult?.length} Kost Murah Dekat ${campusName} | Tantekos.com`,
            description: `Ada ${listResult?.length} kost bebas, kost campur, kost putra, kost putri, kost pasutri. Ada ${listResult?.length} kost dekat ${campusName}.`,
            keyword: `tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat, kost dekat ${campusName}`,
        }
        return (
            <>
                <NextHead>
                    <title>{seo.title}</title>
                    <meta name="googlebot" content="index, follow" />
                    <meta name="robot" content="index, follow" />
                    <meta name="application-name" content="Tantekos" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="title" content={seo.title} />
                    <meta name="description" content={seo.description} />
                    <meta name="keywords" content={seo.keyword} />
                    <meta property="og:title" content={seo.title} />
                    <meta property="og:description" content={seo.description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`https://www.tantekos.com/area/kampus/${slug}?province=${province}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${images}.webp`} />
                    <meta property="og:image:alt" content={campusName} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekos, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" href={`https://www.tantekos.com/area/kampus/${slug}?province=${province}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="container">
                    <div className="lg:mx-3 grid sm:grid-cols-2 md:grid-cols-2">
                        <div className="lg:mr-2 mt-2">
                            {
                                listResult.length === 0 && campusName ?
                                    <Message message={`Belum ada data kost di sekitar ${campusName}`} />
                                    :
                                    <h2 className="text-xl text-blue-600 font-bold p-2 border-b">
                                        {`${listResult.length} kost di sekitar ${campusName}`}
                                    </h2>
                            }
                            <div className="xs:divide-y-8 divide-gray-500 mt-2">
                                {
                                    listResult.length > 0 &&
                                    listResult
                                        .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                        .map((item, index) => <div key={index}>
                                            <CampaignItem item={item} />
                                        </div>
                                        )
                                }
                            </div>
                        </div>
                        <div className="mt-2 lg:ml-2">
                            <Histories />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const setDistance = (lat1, lon1, lat2, lon2, unit) => {
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
const setListData = (data, lat, lng) => {
    let res = []
    for (var i = 0; i < data.length; i++) {
        const distance = setDistance(lat, lng, data[i].location.lat_lng.latitude, data[i].location.lat_lng.longitude, "K")
        if (distance <= 2) res.push({
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
    return res
}
export const getServerSideProps = async (context) => {
    if (context.query.province) {
        const querySnapshotKost = await fire.firestore().collection('kosts')
            .where('location.province', '==', Titlecase(context.query.province))
            .where('is_active', '==', true)
            .get()
        const kosts = querySnapshotKost.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const querySnapshotUniversities = await fire.firestore().collection('provinces')
            .where('slug', '==', context.query.province)
            .get()
        const universities = querySnapshotUniversities.docs.map(doc => doc.data().universities)
        const listUniversities = universities[0]
        let latLng = null
        for (const property in listUniversities) {
            if (Generateslug(listUniversities[property].name) === context.query.campus) {
                latLng = listUniversities[property].latlng
                break
            }
        }
        const list = setListData(kosts, latLng.latitude, latLng.longitude)
        if (universities.length === 0 || !context.query.province) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/'
                }
            }
        }
        return {
            props: {
                list: JSON.stringify(list),
                province: context.query.province,
                slug: context.query.campus,
            }
        }
    }
}
University.propTypes = {
    list: string,
    slug: string,
    province: string
}
University.defaultProps = {
    list: null,
    slug: null,
    province: null
}
export default University