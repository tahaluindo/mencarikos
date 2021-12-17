/* eslint-disable no-undef */
import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'
import fire from '../../../configurations/firebase'
import ComponentCampus from '../../../components/Campus'
const Index = ({ provinces }) => {
    const listProvinces = JSON.parse(provinces)
    let universities = []
    listProvinces.forEach(province => {
        if (province.universities) {
            province.universities.forEach(university => {
                university.is_popular && universities.push({ province: province.name, universities: university })
            })
        }
    })
    const images = ['tt9t2IU', 'NaAULjD', 'RSbvRHn', 'DnxVdqt', 'kOuWQYi', 'TjA9SEq', 'stmSYZ2', 'yXRAu9W', 'rtX3zp9', 'i2aQSZ9'
    ]
    const rand = Math.floor(Math.random() * 10)
    const seo = {
        title: `Kost Murah Dekat Kampus di ${listProvinces?.length} Provinsi | Tantekos.com`,
        description: `Ada kost murah, Kost bebas, kost campur, kost putra, kost putri, kost pasutri di ${listProvinces?.length} provinsi.`,
        keyword: "tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat, kost dekat kampus"
    }
    const url = "https://www.tantekos.com/area/kampus"
    return (
        <>
            <NextHead>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
                <meta name="application-name" content="Tantekos" />
                <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta name="keywords" content={seo.keyword} />
                <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${images[rand]}.webp`} />
                <meta property="og:image:alt" content={seo.title} />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                <meta name="keyphrases" content={seo.keyword} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={url} />
                <link rel="canonical" href={url} />
            </NextHead>
            <ComponentCampus universities={universities} provinces={listProvinces} />
        </>
    )
}
export const getServerSideProps = async () => {
    const querySnapshot = await fire.firestore().collection('provinces').get()
    const provinces = querySnapshot.docs.map(doc => doc.data())
    return {
        props: { provinces: JSON.stringify(provinces) }
    }
}
Index.propTypes = { provinces: string }
Index.defaultProps = { provinces: null }
export default Index