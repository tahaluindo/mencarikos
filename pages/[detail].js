/* eslint-disable no-undef */
import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import { FaRegPlayCircle, FaYoutube } from 'react-icons/fa'
import { RiDirectionFill } from 'react-icons/ri'
import { BiChevronDown, BiChevronRight, BiChevronUp } from 'react-icons/bi'
import Cash from '../utils/Cash'
import Peta from '../components/Peta'
import ToolbarAction from '../components/ToolbarAction'
import moment from 'moment'
import 'moment/locale/id'
import fire from '../configurations/firebase'
import { Bathroom, Room, Share } from '../components/Facilities'
import { type } from '../components/Campaign'
import University from '../components/University'
import Link from 'next/link'
import Generateslug from '../utils/Generateslug'
import YoutubeEmbed from '../components/YoutubeEmbed'
import Verified from '../components/Verified'
import Modal from '../components/Modal'
import Slide from '../components/Slide'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: 414,
      showImages: false,
      showFacilities: true,
      showCampus: false,
      showMap: true,
      displayMap: false,
      showVideo: true,
      playVideo: false
    }
    this.handleShowImages = this.handleShowImages.bind(this)
    this.handleShowFacilities = this.handleShowFacilities.bind(this)
    this.handleShowCampus = this.handleShowCampus.bind(this)
    this.handleShowMap = this.handleShowMap.bind(this)
    this.handleShowVideo = this.handleShowVideo.bind(this)
    this.handlePlayVideo = this.handlePlayVideo.bind(this)
  }
  componentDidMount() {
    let windowWidth = 0
    if (typeof window !== 'undefined') windowWidth = window.innerWidth;
    this.setState({ windowWidth })
    if (windowWidth < 414) {
      document.addEventListener('scroll', this.trackScrolling)
    } else {
      this.setState({ displayMap: true, showCampus: true })
    }
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }
  trackScrolling = () => {
    window.scrollY > 500 && this.setState({ displayMap: true, showCampus: true })
  }
  handleShowFacilities() {
    const { showFacilities } = this.state
    this.setState({ showFacilities: !showFacilities })
  }
  handleShowCampus() {
    const { showCampus } = this.state
    this.setState({ showCampus: !showCampus })
  }
  handleShowMap() {
    const { showMap } = this.state
    this.setState({ showMap: !showMap })
  }
  handleShowVideo() {
    const { showVideo } = this.state
    this.setState({ showVideo: !showVideo })
  }
  handlePlayVideo() {
    const { playVideo } = this.state
    this.setState({ playVideo: !playVideo })
  }
  handleShowImages() {
    const { showImages } = this.state
    this.setState({ showImages: !showImages })
  }
  render() {
    const { slug, details } = this.props
    const { windowWidth, showImages, showFacilities, showCampus, showMap, displayMap, showVideo, playVideo } = this.state
    const detail = JSON.parse(details)
    const url = "https://www.tantekos.com/"
    const structureTypeBreadcrumbList =
      `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "${detail && detail.title}",
          "item": "${url + slug}"
        }]
     }`
    const structureTypeHostel = `{
      "@context": "https://schema.org",
      "@type": "Hostel",
      "image": [${detail && detail.images && detail.images.map(item => `"https://cdn.statically.io/img/i.imgur.com/${item}"`)}],
      "@id": "${url}",
      "name": "${detail && detail.name}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${detail && detail.location && detail.location.district}",
        "addressLocality": "",
        "addressRegion": "${detail && detail.location && detail.location.province}",
        "postalCode": "",
        "addressCountry": "ID"
      },
      "numberOfRooms": "${Math.floor(Math.random() * 20) + 1}",
      "petsAllowed": "${false}",
      "starRating": "${Math.floor(Math.random() * 5) + 1}",
      "checkinTime": "14:00:00-00:00",
      "checkoutTime": "12:00:00-00:00",
      "availableLanguage": {
        "@type": "Language",
        "name": "Indonesia",
        "alternateName": "id"
      },
      "openingHours": "Mo,Tu,We,Th,Fri,Sat 09:00-12:00",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "${detail && detail.location && detail.location.lat_lng.latitude}",
        "longitude": "${detail && detail.location && detail.location.lat_lng.longitude}" 
      },
      "url": "${url + slug}",
      "telephone": "${detail && detail.contact_us && detail.contact_us.phone || ''}",
      "priceRange": "Rp50.000 - ${detail && detail.price && detail.price.start_from}",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "IDR",
      "contactPoint" : { 
        "@type" : "ContactPoint",
        "telephone" : "${detail && detail.contact_us && detail.contact_us.phone || ''}",
        "contactType" : "customer service"
      } 
    }`
    const structureDetailPage = {
      '@graph': [
        JSON.parse(structureTypeHostel),
        JSON.parse(structureTypeBreadcrumbList)
      ]
    }
    const seo = {
      title: `${detail.title} | Tantekos`,
      description: detail.description.replace(/&nbsp;|<\/?[^>]+(>|$)/g, " "),
      keywords: `tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat, kost di ${detail?.location?.district}`
    }
    return <>
      {
        detail &&
        <NextHead>
          <title>{seo.title}</title>
          <meta name="googlebot" content="index, follow" />
          <meta name="robot" content="index, follow" />
          <meta name="application-name" content="Tantekos" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="title" content={seo.title} />
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <meta property="og:title" content={seo.title} />
          <meta property="og:description" content={seo.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${url + slug}`} />
          <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${detail?.images[0]}`} />
          <meta property="og:image:alt" content={seo.title} />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Tantekos" />
          <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
          <meta name="keyphrases" content={seo.keywords} />
          <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
          <link rel="canonical" href={`${url + slug}`} />
          <link rel="preload" href={`https://cdn.statically.io/img/i.imgur.com/q=10/${detail?.images[0]}`} as="image" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureDetailPage) }} />
        </NextHead>
      }

      <article>

        {
          detail &&
          <div className="container">
            {
              windowWidth > 414 &&
              <div className="xs:hidden grid grid-cols-3 gap-2 mt-2">
                <div className="col-span-2">
                  <img
                    className="w-full h-80 object-cover rounded-tl-xl"
                    src={`https://cdn.statically.io/img/i.imgur.com/${detail?.images[1]}`}
                    alt={detail?.title} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                </div>
                <div>
                  <img
                    className="w-full h-80 object-cover rounded-tr-xl"
                    src={`https://cdn.statically.io/img/i.imgur.com/${detail?.images[0]}`}
                    alt={detail?.title} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                </div>
              </div>
            }
            <img
              className="w-full h-52 object-cover sm:hidden md:hidden lg:hidden"
              src={`https://cdn.statically.io/img/i.imgur.com/q=20/${detail.images[0]}`}
              srcSet={`
              https://cdn.statically.io/img/i.imgur.com/q=20/${detail.images[0]} 4x,              
              https://cdn.statically.io/img/i.imgur.com/q=20/${detail.images[0]} 3x,              
            `}
              width={182}
              height={300}
              alt={detail.images[0]} onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
            <ToolbarAction data={detail} handleShowAllImage={this.handleShowImages} />
          </div>
        }

        {
          detail &&
          <div className="container grid lg:grid-cols-2 gap-4">
            <div className="mx-2 mt-2">

              <Verified data={{
                name: detail.name,
                district: detail.location.district,
                verified: detail.verified
              }} />

              {
                detail.price.start_from > 0 &&
                <div className="font-bold text-2xl">
                  {Cash(detail.price.start_from)}
                  <span className="ml-1 text-lg text-gray-600">
                    /{detail.price.duration}
                  </span>
                </div>
              }

              <small className="text-gray-700 uppercase">Diperbarui {moment(detail.date_modified).fromNow()} &middot; {Cash(detail.hit)} Kali Dilihat</small>

              <div className="text-left uppercase text-green-600 font-bold">{type(detail.type)}</div>

              <h1 className="my-3 text-xl capitalize font-bold">{detail.title}</h1>

              <div className="mt-3 lg:mb-3" dangerouslySetInnerHTML={{ __html: detail.description }} />

              <div className="lg:mt-2">
                <h2
                  className="text-xl font-bold py-3 border-b lg:mb-2"
                  onClick={this.handleShowFacilities}>
                  <span>Fasilitas</span>
                  <span className="float-right azure cursor-pointer text-sm">
                    {
                      showFacilities ?
                        <span>
                          Sembunyikan <BiChevronUp size={24} className="mb-1 inline" />
                        </span> :
                        <span>
                          Lihat <BiChevronDown size={24} className="mb-1 inline" />
                        </span>
                    }
                  </span>
                </h2>
                {
                  showFacilities &&
                  <div className="mb-5">
                    {
                      detail && detail.facility && detail.facility.room.length > 0 && detail.facility.room[0] !== "" &&
                      <div className="my-3">
                        <h3 className="ml-2 text-gray-600 font-bold">Kamar</h3>
                        <Room items={detail.facility.room} />
                      </div>
                    }
                    {
                      detail && detail.facility && detail.facility.bathroom.length > 0 && detail.facility.bathroom[0] !== "" &&
                      <div className="mb-3">
                        <h3 className="ml-2 text-gray-600 font-bold">Kamar Mandi</h3>
                        <Bathroom items={detail.facility.bathroom} />
                      </div>
                    }
                    {
                      detail && detail.facility && detail.facility.share.length > 0 && detail.facility.share[0] !== "" &&
                      <div className="lg:mb-5">
                        <h3 className="ml-2 text-gray-600 font-bold">Umum</h3>
                        <Share items={detail.facility.share} />
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
            <div className="mx-2 lg:mt-2">
              {
                detail.video && detail.video.youtube && detail.video.youtube !== "" &&
                <div className="border-b mb-3">
                  <h2 className="pb-3 text-xl font-bold" onClick={this.handleShowVideo}>
                    <span>Video</span>
                    <span className="float-right azure cursor-pointer text-sm">
                      {
                        showVideo ?
                          <span>
                            Sembunyikan <BiChevronUp size={24} className="mb-1 inline" />
                          </span> :
                          <span>
                            Lihat <BiChevronDown size={24} className="mb-1 inline" />
                          </span>
                      }
                    </span>
                  </h2>
                  {
                    showVideo &&
                    <>
                      {
                        playVideo ?
                          <>
                            <YoutubeEmbed title={detail.title} embedId={detail.video.youtube} />
                            <div className="mt-2 pt-2 pb-1 font-bold text-center text-red-500 cursor-pointer uppercase bg-gray-200 rounded-b-md border-red-500 border-2">
                              <a href="https://www.youtube.com/tantekos?sub_confirmation=1" target="_blank" rel="noreferrer" className="hover:text-red-600"> <FaYoutube size={30} className="inline mx-1 mb-1" /> Subscribe</a>
                            </div>
                          </>
                          :
                          <div style={{ backgroundImage: `url("https://cdn.statically.io/img/i.imgur.com/q=75/${detail.images[0]}")` }} className="flex h-52 lg:h-80 object-cover items-center justify-center bg-cover bg-center">
                            <FaRegPlayCircle size={60} className="text-white opacity-60 absolute mx-1 mb-1 cursor-pointer" onClick={this.handlePlayVideo} />
                          </div>
                      }
                    </>
                  }
                </div>
              }
              {
                detail.location &&
                <>
                  <h2 className="pb-3 text-xl border-b font-bold" onClick={this.handleShowMap}>
                    <span className="mb-2">Lokasi</span>
                    <span className="float-right azure cursor-pointer text-sm">
                      {
                        showMap ?
                          <span>
                            Sembunyikan <BiChevronUp size={24} className="mb-1 inline" />
                          </span> :
                          <span>
                            Lihat <BiChevronDown size={24} className="mb-1 inline" />
                          </span>
                      }
                    </span>
                  </h2>
                  {
                    showMap &&
                    <>
                      <div className="my-2">
                        <Link href={`/area/${Generateslug(detail.location.district)}`} passHref>
                          <span className="mr-1 cursor-pointer azure">{detail.location.district}</span>
                        </Link><BiChevronRight className="mb-1 inline" />
                        <Link href={`/area/kota/${Generateslug(detail.location.city)}`} passHref>
                          <span className="mx-1 cursor-pointer azure">{detail.location.city}</span>
                        </Link><BiChevronRight className="mb-1 inline" />
                        <span className="ml-1">{detail.location.province}</span>
                      </div>
                      {
                        displayMap && <Peta location={detail.location} zoom={16} />
                      }
                      <a href={`https://www.google.com/maps/search/?api=1&query=${detail.location.lat_lng.latitude},${detail.location.lat_lng.longitude}`} target="_blank" rel="noreferrer">
                        <div className="my-2 p-2 uppercase rounded-b-md border-blue-400 text-center azure font-bold border-2"><RiDirectionFill className="inline mb-1 mr-2" size={32} />Lihat Rute</div>
                      </a>
                    </>
                  }
                </>
              }
              <h2 className="py-3 text-xl border-b font-bold" onClick={this.handleShowCampus}>
                <span className="mb-2">Kampus Terdekat</span>
                <span className="float-right azure cursor-pointer text-sm">
                  {
                    showCampus ?
                      <span>
                        Sembunyikan <BiChevronUp size={24} className="mb-1 inline" />
                      </span> :
                      <span>
                        Lihat <BiChevronDown size={24} className="mb-1 inline" />
                      </span>
                  }
                </span>
              </h2>
              {
                showCampus && <University location={detail.location} viewport={detail.location && detail.location.lat_lng} />
              }
            </div>
          </div>
        }

      </article>

      <Modal
        title="Foto"
        show={showImages}
        onHide={this.handleShowImages}
        body={
          <Slide images={detail.images} />
        } />

      <style global jsx>{`
        ul { 
          list-style: none;
          margin-left: 0rem !important; 
        }
        .list-disc {list-style-type: none;}
      `}</style>
    </>
  }
}
export const getServerSideProps = async (context) => {
  const detail = await fire
    .firestore().collection('kosts')
    .where('slug', '==', context.query.detail)
    .where('is_active', '==', true)
    .get()
    .then(doc => ({
      id: doc.docs[0].id,
      ...doc.docs[0].data(),
    }))
    .catch(err => console.log(err))
  if (detail && process.env.NODE_ENV !== "development") {
    const hit = detail.hit + 1
    await fire.firestore().collection("kosts")
      .doc(detail.id).update({ hit })
      .catch(err => { console.log(err) })
  }
  if (!detail) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  return {
    props: {
      slug: context.query.detail,
      details: JSON.stringify(detail)
    },
  };
};
Detail.propTypes = {
  slug: string,
  details: string
}
Detail.defaultProps = {
  slug: null,
  details: null
}
export default Detail