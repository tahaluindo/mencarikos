import React from "react"
import NextHead from 'next/head'
import { string, number } from 'prop-types'
import Titlecase from '../../utils/Titlecase'
import Generateslug from '../../utils/Generateslug'
import fire from '../../configurations/firebase'
import CampaignItem from "../../components/CampaignItem"
import Message from "../../components/Message"
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaChevronDown } from "react-icons/fa"
import Histories from "../../components/Histories"
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
        this.scrollToTop = this.scrollToTop.bind(this);
    }
    // componentDidMount() {
    //     document.addEventListener('scroll', this.trackScrolling);
    // }
    // componentWillUnmount() {
    //     document.removeEventListener('scroll', this.trackScrolling);
    // }
    scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }) }
    // trackScrolling = () => {
    //     const { lengthData } = this.props
    //     const { data } = this.state
    //     const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    //     const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    //     const scrolled = winScroll / height
    //     window.scrollY > 1000 ? this.setState({ showButtonScroll: true })
    //         : this.setState({ showButtonScroll: false })
    //     data.length !== lengthData && scrolled > 0.9 && this.handleLoadMore()
    // }
    async handleLoadMore() {
        const { limit, amount, data } = this.state
        const { slug } = this.props
        this.setState({ loadMore: true })
        var first = fire.firestore()
            .collection("kosts")
            .where("location.district", "==", Titlecase(slug))
            .limit(limit);
        return first.get().then((documentSnapshots) => {
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]
            var docRef = fire.firestore()
                .collection("kosts")
                .where("location.district", "==", Titlecase(slug))
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
        const { slug, listData, lengthData } = this.props
        const area = JSON.parse(listData)
        const location = Titlecase(slug)
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
                    "@id": "https://www.tantekos.com/area/${slug}",
                    "name": "${location}"
                }
            }
        ]
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
                    <meta property="og:url" content={`https://www.tantekos.com/area/${slug}`} />
                    <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${seo.image}`} />
                    <meta property="og:image:alt" content={location} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content={seo.keyword} />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" href={`https://www.tantekos.com/area/${slug}`} />
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
                                data
                                    // .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                    .map((item, index) => <div key={index}>
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
                        </div>
                    </div>
                    <div>
                        <Histories />
                    </div>
                    {/* <FaChevronUp
                        className={`${showButtonScroll ? 'block' : 'hidden'} shadow p-2 fixed w-10 h-10 bg-gray-200 cursor-pointer rounded-full azure`}
                        style={{ bottom: 80, right: 20 }}
                        onClick={this.scrollToTop}
                    /> */}
                </div>
            </>
        )
    }
}
export async function getServerSideProps(context) {
    let lengthData = 0
    await fire.firestore().collection("kosts")
        .where("location.district", "==", Titlecase(context.query.area))
        .where('is_active', '==', true)
        .get().then(querySnapshot => lengthData = querySnapshot.size)
    const querySnapshot = await fire.firestore().collection('kosts')
        .where("location.district", "==", Titlecase(context.query.area))
        .where('is_active', '==', true)
        .limit(5)
        .get()
    const kosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return {
        props: {
            slug: context.query.area,
            listData: JSON.stringify(kosts),
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