import React from 'react'
import NextHead from 'next/head'
import fire from '../../configurations/firebase'
import ComponentCities from '../../components/Cities'
import Histories from '../../components/Histories'
import Modal from '../../components/Modal'
import Filter from '../../components/Filter'
import { BiFilterAlt } from 'react-icons/bi'
import FeedsGrid from '../../components/FeedsGrid'
import Message from '../../components/Message'

class Cities extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataCallback: null,
            show: false,
            load: true
        }
    }

    handleFilterCallback = (dataCallback) => {

        const dt = fire.firestore().collection('kosts')
        let facilitiesRoom = [""]
        let conditions

        if (dataCallback.facilitiesRoom.length > 0) facilitiesRoom = dataCallback.facilitiesRoom

        if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        }
        conditions.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            // disable sementara filter by durasi (hari/minggu/bulan/tahun)
            // const dataFilterByDuration = data.filter((item) => item.durations.includes(dataCallback.duration.toLowerCase()))

            this.setState({
                data,
                show: false,
                dataCallback,
                load: false
            })
        })
    }

    handleClose = () => { this.setState({ show: false }) }

    handleShow = () => { this.setState({ show: true }) }

    render() {
        const { provinces } = this.props
        const { show, data, dataCallback } = this.state
        const list = JSON.parse(provinces)
        const seo = {
            title: `Kost Murah - ${list.length} Kota dan Kabupaten | Tantekos.com`,
            description: 'Info Kost Murah Terdekat Sewa Harian Mingguan & Bulanan. Cari Kos Pria & Putri Terdekat Daerah Kota dan Kabupaten.',
            url: '',
            keyword: 'tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat'
        }

        let location = null

        if (dataCallback && dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
            location = dataCallback.province
        }

        if (dataCallback && dataCallback.city !== '---Semua---') {
            location = dataCallback.city + ', ' + dataCallback.province
        }

        if (dataCallback && dataCallback.district !== '---Semua---') {
            location = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province
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
                    <meta property="og:url" content="https://www.tantekos.com/area/id" />
                    <meta property="og:image" content="https://cdn.statically.io/img/i.imgur.com/i2aQSZ9.webp" />
                    <meta property="og:image:alt" content={seo.title} />
                    <meta property="og:locale" content="id_ID" />
                    <meta property="og:site_name" content="Tantekos" />
                    <meta property="fb:app_id" content={process.env.NEXT_PUBLIC_REACT_APP_FB_CLIENT_ID} />
                    <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekos, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                    <link rel="canonical" href="https://www.tantekos.com/area/id" />
                </NextHead>
                <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-2">
                    <div className="divide-y">
                        {
                            dataCallback ?
                                <>
                                    {
                                        data.length > 0 && location &&
                                        <div className="py-2 px-2 font-bold bg-white">
                                            {`${data.length} Kost di ${location}`}
                                        </div>
                                    }
                                    {
                                        data.length > 0 ?
                                            <FeedsGrid data={data} />
                                            : <Message title="Tidak ada" message={`Belum ada data kost di ${location}`} />
                                    }
                                </>
                                :
                                <ComponentCities provinces={list} />
                        }
                    </div>
                    <div>
                        <div className="filter-button cursor-pointer fixed inset-x-0 bottom-0 pt-5 text-center z-40">
                            <span onClick={this.handleShow} className={`${!show ? 'bg-indigo-700 text-white' : 'bg-white text-black border'} rounded-md shadow-md w-max p-3 hover:bg-white-700 focus:outline-none uppercase font-bold`}>
                                <BiFilterAlt className="inline mb-1 mr-1" />Filter
                            </span>
                        </div>
                        <Histories />
                    </div>
                </div>
                <Modal
                    title="Filter"
                    show={show}
                    onHide={this.handleClose}
                    body={
                        <Filter
                            provinces={provinces}
                            callbackFromParent={this.handleFilterCallback} />
                    } />
                <style jsx>{`
                    .filter-button {
                        margin-bottom: 100px
                    }
                    `}</style>
            </>
        )
    }
}
export const getServerSideProps = async () => {
    const queryProvinces = await fire.firestore().collection('provinces').get()
    const provinces = queryProvinces.docs.map(doc => doc.data())
    return {
        props: { provinces: JSON.stringify(provinces) }
    }
}
export default Cities