import React from "react"
import NextHead from 'next/head'
import { string, number } from 'prop-types'
import Titlecase from '../../../utils/Titlecase'
import Generateslug from '../../../utils/Generateslug'
import fire from '../../../configurations/firebase'
import CampaignItem from "../../../components/CampaignItem"
import Message from "../../../components/Message"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaChevronDown } from "react-icons/fa"
import Histories from "../../../components/Histories"
class Lists extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: JSON.parse(props.listData),
            limit: 5,
            amount: 5,
            showButtonScroll: false,
            loadMore: false
        }
        this.handleLoadMore = this.handleLoadMore.bind(this)
    }
    async handleLoadMore() {
        const { limit, amount, data } = this.state
        const { slug } = this.props
        this.setState({ loadMore: true })
        var first = fire.firestore()
            .collection("kosts")
            .where("location.city", "==", Titlecase(slug))
            .limit(limit);
        return first.get().then((documentSnapshots) => {
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
            var docRef = fire.firestore()
                .collection("kosts")
                .where("location.city", "==", Titlecase(slug))
                .startAfter(lastVisible).limit(amount);
            docRef.onSnapshot(snap => {
                const listData = snap.docs.map(doc => ({
                    id: doc.id, ...doc.data()
                }))
                this.setState({ loadMore: false, data: [...data, ...listData], limit: limit + amount })
            })
            docRef.get().catch(err => console.log(err))
        })
    }
    render() {
        const { data, loadMore } = this.state
        const { slug, provinces, listData, lengthData } = this.props
        const area = JSON.parse(listData)
        const listProvinces = JSON.parse(provinces)
        const location = Titlecase(slug)
        let dataCity = listProvinces.reduce(function (acc, curr, i, arr) {
            const city = curr.city.find(i => i.name === location)
            if (city) arr.splice(1);
            return city
        }, []);
        const seo = {
            title: `Kost Terdekat - Ada ${lengthData} Kost Murah di ${location}  | Tantekos.com`,
            description: `Ada ${lengthData} kost bebas, kost campur, kost putra, kost putri dan kost pasutri tersedia di ${location}.`,
            keyword: `tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat, kost di ${location}`,
            image: area[0]?.images[0]
        }
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
                    "name": "Home"
                }
            },
            {
                "@type": "ListItem",
                "position": 2,
                "item": {
                    "@id": "https://www.tantekos.com/area/id",
                    "name": "Semua Kota"
                }
            },
            {
                "@type": "ListItem",
                "position": 3,
                "item": {
                    "@id": "https://www.tantekos.com/area/kota/${slug}",
                    "name": "${location}"
                }
            }
        ]
       }`
        const structureLodgingBusiness =
            `{
                "@context": "http://schema.org",
                "@type": "LodgingBusiness",
                    "hasMap": "https://maps.google.com/maps?z=7&q=${dataCity.lat_lng.latitude},${dataCity.lat_lng.longitude}",
                    "url": "https://www.tantekos.com/area/kota/${slug}",
                    "priceRange": "Rp 0 - Rp 10000000",
                    "name": "${location}",
                    "image": "https://cdn.statically.io/img/i.imgur.com/${seo.image}",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "5",
                        "bestRating": "5",
                        "ratingCount": "7"
                    },
                "offers": {
                    "@type": "AggregateOffer",
                    "lowPrice": "400000",
                    "highPrice": "5500000",
                    "priceCurrency": "IDR"
                },
                "telephone": "+6287855133758",
                "address": "${location}"
        }`

        const structureTypeItemList =
            `{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Area ${location}",
            "itemListElement": [
                ${area && area.map((item, index) => `{
                    "@type": "ListItem",
                    "position": ${index + 1},
                    "url": "https://www.tantekos.com/${Generateslug(item.title)}"
                }`)}
            ]
        }`
        const structureAreaPage = {
            '@graph': [
                JSON.parse(structureTypeItemList),
                JSON.parse(structureLodgingBusiness),
                JSON.parse(structureTypeBreadcrumbList)
            ]
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
                    <meta property="og:url" content={`https://www.tantekos.com/area/kota/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${seo.image}`} />
                    <meta property="og:image:alt" content={location} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content={seo.keyword} />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" href={`https://www.tantekos.com/area/kota/${slug}`} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureAreaPage) }} />
                </NextHead>
                <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-2">
                    <div>
                        {
                            area && area.length === 0 ?
                                <Message title="Tidak ada" message={`Belum ada data kost di area ${location}`} />
                                :
                                <h2 className="text-xl text-blue-600 font-bold p-2 border-b">
                                    {`${lengthData} kost di ${location}`}
                                </h2>
                        }
                        <div className="xs:divide-y-8 divide-gray-500">
                            {
                                data.map((item, index) => <div key={index}>
                                    <CampaignItem item={item} />
                                </div>
                                )
                            }
                            {
                                area.length > 0 &&
                                <div className="text-center pt-3 lg:pb-3 font-bold">{lengthData !== data.length &&
                                    <div className="cursor-pointer border-2 border-blue-400 rounded-md xs:mx-2 p-3 uppercase azure" onClick={this.handleLoadMore}>
                                        {
                                            loadMore ?
                                                <AiOutlineLoading3Quarters size={16} className="animate-spin inline mr-1 mb-1" /> : <span>Lainnya <FaChevronDown size={18} className="ml-1 mb-1 inline" /></span>
                                        }
                                    </div>
                                }</div>
                            }
                        </div >
                    </div>
                    <div>
                        <Histories />
                    </div>
                </div>
            </>
        )
    }
}
export async function getServerSideProps(context) {
    let lengthData = 0
    const queryProvinces = await fire.firestore().collection('provinces').get()
    const provinces = queryProvinces.docs.map(doc => doc.data())
    await fire.firestore().collection("kosts")
        .where("location.city", "==", Titlecase(context.query.city))
        .where('is_active', '==', true)
        .get().then(querySnapshot => lengthData = querySnapshot.size)
    const querySnapshot = await fire.firestore().collection('kosts')
        .where("location.city", "==", Titlecase(context.query.city))
        .where('is_active', '==', true)
        .limit(5)
        .get()
    const listData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return {
        props: {
            slug: context.query.city,
            listData: JSON.stringify(listData),
            provinces: JSON.stringify(provinces),
            lengthData: lengthData
        }
    }
}
Lists.propTypes = {
    slug: string,
    lengthData: number,
    listData: string
}
Lists.defaultProps = {
    slug: null,
    lengthData: null,
    listData: null
}
export default Lists