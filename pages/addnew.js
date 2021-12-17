import React, { useState, useEffect } from 'react'
import fire from '../configurations/firebase'
import Generateslug from '../utils/Generateslug'
import { FiSend } from 'react-icons/fi'
import { useSession, signIn } from 'next-auth/client'
import { BtnBold, BtnUnderline, BtnItalic, Editor, Toolbar, BtnBulletList } from 'react-simple-wysiwyg';
import Header from '../components/Header'
function Addnew({ provinces }) {

    const initType = {
        Campur: true,
        Putra: false,
        Putri: false,
        Pasutri: false
    }
    const initDurations = {
        hari: false,
        minggu: false,
        bulan: true,
        tahun: false
    }
    const initFacilityRoom = {
        kamarMandiDalam: false,
        wifi: false,
        springbed: false,
        kasur: false,
        lemariPakaian: false,
        meja: false,
        kursi: false,
        exhaustFan: false,
        kipasAngin: false,
        tv: false,
        ac: false,
        dapur: false
    }
    const initFacilityBathroom = {
        shower: false,
        waterHeater: false,
        wastafel: false,
        bathtub: false,
        klosetJongkok: true,
        klosetDuduk: false
    }
    const initFacilityShare = {
        dapur: false,
        parkirMotor: true,
        parkirMobil: false,
        kamarMandiLuar: false,
        rJemur: false,
        rCuci: false,
        rTamu: false
    }
    const listFacility = [
        { name: 'kamarMandiDalam', title: 'Kamar Mandi Dalam' },
        { name: 'wifi', title: 'Wifi' },
        { name: 'springbed', title: 'Springbed' },
        { name: 'kasur', title: 'Kasur' },
        { name: 'lemariPakaian', title: 'Lemari Pakaian' },
        { name: 'meja', title: 'Meja' },
        { name: 'kursi', title: 'Kursi' },
        { name: 'exhaustFan', title: 'Exhaust Fan' },
        { name: 'kipasAngin', title: 'Kipas Angin' },
        { name: 'tv', title: 'TV' },
        { name: 'ac', title: 'AC' },
        { name: 'shower', title: 'Shower' },
        { name: 'waterHeater', title: 'Water Heater' },
        { name: 'wastafel', title: 'Wastafel' },
        { name: 'bathtub', title: 'Bathtub' },
        { name: 'klosetJongkok', title: 'Kloset Jongkok' },
        { name: 'klosetDuduk', title: 'Kloset Duduk' },
        { name: 'dapur', title: 'Dapur' },
        { name: 'parkirMotor', title: 'Parkir Motor' },
        { name: 'parkirMobil', title: 'Parkir Mobil' },
        { name: 'kamarMandiLuar', title: 'Kamar Mandi Luar' },
        { name: 'rJemur', title: 'R.Jemur' },
        { name: 'rCuci', title: 'R.Cuci' },
        { name: 'rTamu', title: 'R.Tamu' }
    ]
    const facilityTitle = (key) => listFacility.filter(facility => facility.name === key)
    const strToArray = (str) => { return str.trim().split(", ") }
    const [publish, setPublish] = useState(false)
    const [type, setType] = useState(initType)
    const [durations, setDurations] = useState(initDurations);
    const [facilityRoom, setFacilityRoom] = useState(initFacilityRoom);
    const [facilityBathroom, setFacilityBathroom] = useState(initFacilityBathroom);
    const [facilityShare, setFacilityShare] = useState(initFacilityShare);
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [province, setProvince] = useState("Bali")
    const [city, setCity] = useState("Denpasar")
    const [district, setDistrict] = useState("Denpasar Utara")
    const [lat_lng, setLatlng] = useState("")
    const [contact_phone, setContactPhone] = useState("")
    const [contact_whatsapp, setContactWhatsapp] = useState("")
    const [start_from, setStartFrom] = useState("")
    const [duration, setDuration] = useState("Bulan")
    const [post_url, setPostUrl] = useState("")
    const [allImages, setAllimages] = useState("")
    const [session] = useSession()

    const wordLength = description.split(' ').length

    useEffect(() => {
        if (!session) {
            signIn('google', { callbackUrl: '/account' })
        }
    })

    const onFileChange = event => {
        let f = event.target.files
        let i = []
        for (let index = 0; index < f.length; index++) {
            let file = f[index]
            i.push(file)
        }
        setAllimages(i)
    }
    const onFileUpload = (e) => {
        e.preventDefault();
        setPublish(true)
        if (name !== "" && title !== "" && description !== "" && start_from !== "" && contact_phone !== "" && allImages.length > 0) {
            let images = []
            for (let index = 0; index < allImages.length; index++) {
                let file = allImages[index]
                const formdata = new FormData();
                formdata.append("image", file);
                fetch("https://api.imgur.com/3/image", {
                    method: "post",
                    headers: {
                        Authorization: "Client-ID e6aa071d345d18f"
                    },
                    body: formdata
                })
                    .then(data => data.json())
                    .then(data => {
                        images.push(data.data.id + '.webp')
                        if (index + 1 === allImages.length) {
                            handleSubmit(images)
                        }
                    })
            }
        } else {
            alert('Data tidak valid!');
        }
    }

    const handleSubmit = (images) => {

        let arrType = []
        for (const property in type) { type[property] && arrType.push(property) }

        let arrDurations = []
        for (const property in durations) { durations[property] && arrDurations.push(property) }

        let arrFacilityRoom = []
        for (const property in facilityRoom) { facilityRoom[property] && arrFacilityRoom.push(facilityTitle(property)[0].title) }

        let arrFacilityBathroom = []
        for (const property in facilityBathroom) { facilityBathroom[property] && arrFacilityBathroom.push(facilityTitle(property)[0].title) }

        let arrFacilityShare = []
        for (const property in facilityShare) { facilityShare[property] && arrFacilityShare.push(facilityTitle(property)[0].title) }

        const campur = type.Campur ? 'kost campur, ' : ''
        const putra = type.Putra ? 'kost putra, ' : ''
        const putri = type.Putri ? 'kost putri, ' : ''
        const pasutri = type.Pasutri ? 'kost pasutri, ' : ''
        const hari = durations.hari ? 'kost harian, ' : ''
        const minggu = durations.minggu ? 'kost mingguan, ' : ''
        const bulan = durations.bulan ? 'kost bulanan, ' : ''
        const tahun = durations.tahun ? 'kost tahunan, ' : ''

        const keywords = hari + minggu + bulan + tahun + campur + putra + putri + pasutri + 'kost putra dekat ' + district + ', kost putri dekat ' + district + ', kost ' + district + ', kost di ' + district + ', kost ' + city + ', kost di ' + city
        let found = false
        const docRef = fire
            .firestore().collection('kosts')
            .where('slug', '==', Generateslug(title))
        docRef.onSnapshot(snap => {
            const data = snap.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }))
            data.length > 0 && (found = true)
        })
        let user = {}
        if (session) {
            user = {
                uid: '',
                display_name: session.user.name,
                email: session.user.email,
                photo_url: session.user.image
            }
        }
        const randomSlug = Math.random().toString(20).substr(2, 5)
        docRef.get()
            .then(() => {
                if (!found) {
                    fire.firestore().collection("kosts")
                        .add({
                            date_modified: Date.now(),
                            date_published: Date.now(),
                            slug: Generateslug(title) + '-' + randomSlug,
                            name: name,
                            title: title + ' ' + randomSlug,
                            description: description,
                            durations: arrDurations,
                            keywords: keywords,
                            images: images,
                            location: {
                                province: province,
                                city: city,
                                district: district,
                                near: [],
                                lat_lng: new fire.firestore.GeoPoint(Number(strToArray(lat_lng)[0]), Number(strToArray(lat_lng)[1]))
                            },
                            category: "Kost",
                            type: arrType,
                            contact_us: {
                                phone: "+" + contact_phone,
                                whatsapp: contact_whatsapp
                            },
                            facility: {
                                room: arrFacilityRoom,
                                bathroom: arrFacilityBathroom,
                                share: arrFacilityShare
                            },
                            price: {
                                start_from: parseInt(start_from),
                                duration: duration
                            },
                            post_url: post_url,
                            user: user,
                            is_active: true,
                            hit: 1,
                            verified: false
                        })
                        .then(() => { alert('Data saved') })
                        .catch((error) => { alert(error.message) })

                    setName("")
                    setTitle("")
                    setDescription("")
                    setProvince("")
                    setCity("")
                    setDistrict("")
                    setLatlng("")
                    setContactPhone("")
                    setContactWhatsapp("")
                    setPostUrl("")
                    setStartFrom("")
                    setDuration("")
                    setPublish(false)
                } else {
                    alert('Judul sudah terdaftar, silahkan ubah dengan judul lain!')
                }
            })
            .catch(err => console.log(err))
    }

    const toggleType = (types) => {
        switch (types) {
            case 'Campur':
                setType((prevState) => ({ ...prevState, Campur: !type.Campur }));
                break;
            case 'Putra':
                setType((prevState) => ({ ...prevState, Putra: !type.Putra }));
                break;
            case 'Putri':
                setType((prevState) => ({ ...prevState, Putri: !type.Putri }));
                break;
            default:
                setType((prevState) => ({ ...prevState, Pasutri: !type.Pasutri }));
                break;
        }
    }

    const toggleDurations = (duration) => {
        switch (duration) {
            case 'hari':
                setDurations((prevState) => ({ ...prevState, hari: !durations.hari }));
                break;
            case 'minggu':
                setDurations((prevState) => ({ ...prevState, minggu: !durations.minggu }));
                break;
            case 'bulan':
                setDurations((prevState) => ({ ...prevState, bulan: !durations.bulan }));
                break;
            default:
                setDurations((prevState) => ({ ...prevState, tahun: !durations.tahun }));
                break;
        }
    }

    const toggleFacilityRoom = (facility) => {
        switch (facility) {
            case 'kamarMandiDalam':
                setFacilityRoom((prevState) => ({ ...prevState, kamarMandiDalam: !facilityRoom.kamarMandiDalam }));
                break;
            case 'wifi':
                setFacilityRoom((prevState) => ({ ...prevState, wifi: !facilityRoom.wifi }));
                break;
            case 'springbed':
                setFacilityRoom((prevState) => ({ ...prevState, springbed: !facilityRoom.springbed }));
                break;
            case 'kasur':
                setFacilityRoom((prevState) => ({ ...prevState, kasur: !facilityRoom.kasur }));
                break;
            case 'lemariPakaian':
                setFacilityRoom((prevState) => ({ ...prevState, lemariPakaian: !facilityRoom.lemariPakaian }));
                break;
            case 'meja':
                setFacilityRoom((prevState) => ({ ...prevState, meja: !facilityRoom.meja }));
                break;
            case 'kursi':
                setFacilityRoom((prevState) => ({ ...prevState, kursi: !facilityRoom.kursi }));
                break;
            case 'exhaustFan':
                setFacilityRoom((prevState) => ({ ...prevState, exhaustFan: !facilityRoom.exhaustFan }));
                break;
            case 'kipasAngin':
                setFacilityRoom((prevState) => ({ ...prevState, kipasAngin: !facilityRoom.kipasAngin }));
                break;
            case 'tv':
                setFacilityRoom((prevState) => ({ ...prevState, tv: !facilityRoom.tv }));
                break;
            case 'dapur':
                setFacilityRoom((prevState) => ({ ...prevState, dapur: !facilityRoom.dapur }));
                break;
            default:
                setFacilityRoom((prevState) => ({ ...prevState, ac: !facilityRoom.ac }));
                break;
        }
    }

    const toggleFacilityBathroom = (facility) => {
        switch (facility) {
            case 'shower':
                setFacilityBathroom((prevState) => ({ ...prevState, shower: !facilityBathroom.shower }));
                break;
            case 'waterHeater':
                setFacilityBathroom((prevState) => ({ ...prevState, waterHeater: !facilityBathroom.waterHeater }));
                break;
            case 'wastafel':
                setFacilityBathroom((prevState) => ({ ...prevState, wastafel: !facilityBathroom.wastafel }));
                break;
            case 'bathtub':
                setFacilityBathroom((prevState) => ({ ...prevState, bathtub: !facilityBathroom.bathtub }));
                break;
            case 'klosetJongkok':
                setFacilityBathroom((prevState) => ({ ...prevState, klosetJongkok: !facilityBathroom.klosetJongkok }));
                break;
            default:
                setFacilityBathroom((prevState) => ({ ...prevState, klosetDuduk: !facilityBathroom.klosetDuduk }));
                break;
        }
    }

    const toggleFacilityShare = (facility) => {
        switch (facility) {
            case 'dapur':
                setFacilityShare((prevState) => ({ ...prevState, dapur: !facilityShare.dapur }));
                break;
            case 'parkirMotor':
                setFacilityShare((prevState) => ({ ...prevState, parkirMotor: !facilityShare.parkirMotor }));
                break;
            case 'parkirMobil':
                setFacilityShare((prevState) => ({ ...prevState, parkirMobil: !facilityShare.parkirMobil }));
                break;
            case 'kamarMandiLuar':
                setFacilityShare((prevState) => ({ ...prevState, kamarMandiLuar: !facilityShare.kamarMandiLuar }));
                break;
            case 'rJemur':
                setFacilityShare((prevState) => ({ ...prevState, rJemur: !facilityShare.rJemur }));
                break;
            case 'rCuci':
                setFacilityShare((prevState) => ({ ...prevState, rCuci: !facilityShare.rCuci }));
                break;
            default:
                setFacilityShare((prevState) => ({ ...prevState, rTamu: !facilityShare.rTamu }));
                break;
        }
    }
    const seo = {
        title: 'Buat Iklan | Tantekos.com',
        description: 'Buat Iklan Baru.',
        url: 'addnew',
        keyword: 'buat iklan',
        image: 'i2aQSZ9'
    }
    return (
        <>
            {
                session &&
                <>
                    <Header seo={seo} />
                    <form className="bg-white mx-3 my-3" onSubmit={onFileUpload}>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Kost <span className="text-danger">*</span></label>
                            <input required className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="name" type="text" placeholder="Nama Kost" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Judul <span className="text-danger">*</span></label>
                            <input required className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="title" maxLength={50} size={50} type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Deskripsi Kost <span className="text-danger">*</span></label>
                            <Editor value={description} onChange={(e) => setDescription(e.target.value)}>
                                <Toolbar>
                                    <BtnBold />
                                    <BtnItalic />
                                    <BtnUnderline />
                                    <BtnBulletList />
                                </Toolbar>
                            </Editor>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full my-3 px-2 py-2 text-gray-700 border focus:outline-none" rows="4"></textarea>
                            <div className={`font-bold text-${wordLength < 200 ? 'red' : 'green'}-500`}>{wordLength}/200</div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_from">Harga Sewa / Durasi <span className="text-danger">*</span></label>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <input required className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="start_from" type="number" placeholder="1500000" value={start_from} onChange={(e) => setStartFrom(e.target.value)} />
                                </div>
                                <div>
                                    <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}>
                                        <option>Hari</option>
                                        <option>Minggu</option>
                                        <option>Bulan</option>
                                        <option>Tahun</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Jenis Sewa <span className="text-danger">*</span></label>
                            <div className="capitalize grid grid-cols-2 gap-0">
                                {
                                    Object.keys(durations).map((key, index) =>
                                        <div key={index}>
                                            <div className={`font-bold clamp-1 rounded cursor-pointer m-1 py-3 text-center ${durations[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleDurations(key)}>{key}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Tipe Kost <span className="text-danger">*</span></label>
                            <div className="grid grid-cols-2 gap-0">
                                {
                                    Object.keys(type).map((key, index) =>
                                        <div key={index}>
                                            <div className={`font-bold clamp-1 rounded cursor-pointer m-1 py-3 text-center ${type[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleType(key)}>{key}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Foto Kost <span className="text-danger">*</span></label>
                            <input required type="file" multiple onChange={onFileChange} accept="image/*" />
                            <div className="small my-1 text-green-500 font-bold">Pilih beberapa foto sekaligus</div>
                        </div>

                        <div className="text-3xl font-bold border-b-2 mb-3">Lokasi</div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Provinsi <span className="text-danger">*</span></label>
                            <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                value={province}
                                onChange={
                                    (e) => {
                                        setProvince(e.target.value)
                                        setCity("")
                                        setDistrict("")
                                    }
                                }>
                                {
                                    provinces
                                        .sort((a, b) => {
                                            var nameA = Generateslug(a.name.toUpperCase())
                                            var nameB = Generateslug(b.name.toUpperCase())
                                            if (nameA < nameB) return -1
                                            if (nameA > nameB) return 1
                                            return 0
                                        })
                                        .map((p, index) => <option key={index}>{p.name}</option>)
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota/Kabupaten <span className="text-danger">*</span></label>
                            <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}>
                                {
                                    provinces
                                        .filter(p => p.name === province)
                                        .map(c =>
                                            c.city
                                                .sort((a, b) => {
                                                    var nameA = Generateslug(a.name.toUpperCase())
                                                    var nameB = Generateslug(b.name.toUpperCase())
                                                    if (nameA < nameB) return -1
                                                    if (nameA > nameB) return 1
                                                    return 0
                                                })
                                                .map((item, index) =>
                                                    <option key={index}>{item.name}</option>
                                                )
                                        )
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Kecamatan <span className="text-danger">*</span></label>
                            <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}>
                                {
                                    provinces
                                        .filter(p => p.name === province)
                                        .map(cities =>
                                            cities.city
                                                .filter(c => c.name === city)
                                                .map(s =>
                                                    s.subdistrict
                                                        .sort((a, b) => {
                                                            var nameA = Generateslug(a.name.toUpperCase())
                                                            var nameB = Generateslug(b.name.toUpperCase())
                                                            if (nameA < nameB) return -1
                                                            if (nameA > nameB) return 1
                                                            return 0
                                                        })
                                                        .map((i, index) =>
                                                            <option key={index}>{i.name}</option>
                                                        )
                                                )
                                        )
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2 font-bold" htmlFor="lat_lng">Latitude, Longitude</label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="lat_lng" type="text" placeholder="-8.669823629718868, 115.20791945067694" value={lat_lng} onChange={(e) => setLatlng(e.target.value)} />
                        </div>

                        <div className="text-3xl font-bold border-b-2 mb-3">Kontak</div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Nomor Handphone <span className="text-danger">*</span></label>
                            <input required className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_phone" type="text" placeholder="6285243322123" value={contact_phone} onChange={(e) => setContactPhone(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_whatsapp">Nomor Whatsapp</label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="contact_whatsapp" type="text" placeholder="6285243322123" value={contact_whatsapp} onChange={(e) => setContactWhatsapp(e.target.value)} />
                        </div>

                        <div className="text-3xl font-bold border-b-2 mb-3">Fasilitas</div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Kamar <span className="text-danger">*</span></label>
                            <div className="capitalize grid grid-cols-3 gap-0">
                                {
                                    Object.keys(facilityRoom).map((key, index) =>
                                        <div key={index}>
                                            <div className={`font-bold clamp-1 rounded cursor-pointer m-1 p-1 text-center small ${facilityRoom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityRoom(key)}>{facilityTitle(key)[0].title}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Kamar Mandi <span className="text-danger">*</span></label>
                            <div className="capitalize grid grid-cols-3 gap-0">
                                {
                                    Object.keys(facilityBathroom).map((key, index) =>
                                        <div key={index}>
                                            <div className={`font-bold clamp-1 rounded cursor-pointer m-1 p-1 text-center small ${facilityBathroom[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityBathroom(key)}>{facilityTitle(key)[0].title}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact_phone">Fasilitas Bersama <span className="text-danger">*</span></label>
                            <div className="capitalize grid grid-cols-3 gap-0">
                                {
                                    Object.keys(facilityShare).map((key, index) =>
                                        <div key={index}>
                                            <div className={`font-bold clamp-1 rounded cursor-pointer m-1 p-1 pr-2 text-center small ${facilityShare[key] ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={() => toggleFacilityShare(key)}>{facilityTitle(key)[0].title}</div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <div className="text-3xl font-bold border-b-2 mb-3">URL</div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="post_url">Website</label>
                            <input className="border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none" id="Website" type="text" placeholder="Website" value={post_url} onChange={(e) => setPostUrl(e.target.value)} />
                        </div>

                        <button className={`${publish ? "bg-gray-300 text-current" : "bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white"} text-xl font-bold py-2 px-4 rounded w-100`} type="submit"><FiSend className="inline mb-1" /> {publish ? 'Sending Data...' : `Publish`}</button>

                    </form>
                </>
            }

        </>

    )
}
Addnew.getInitialProps = async (ctx) => {
    let provinces = []
    let cities = []
    const querySnapshot = await fire.firestore().collection('provinces').get()
    querySnapshot.forEach(doc => { provinces.push({ id: doc.id, ...doc.data() }) })
    return { provinces }
}
export default Addnew