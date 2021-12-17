import React from 'react'
import Generateslug from '../utils/Generateslug'
import Cash from '../utils/Cash'
class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            duration: 'Bulan',
            province: 'Daerah Istimewa Yogyakarta',
            city: '---Semua---',
            district: '---Semua---',
            rangePrice: { min: 200000, max: 1500000 },
            facilities: {
                kamarMandiDalam: true,
                ac: true,
                wifi: true,
                kasur: true,
                lemariPakaian: true,
                meja: true,
                kursi: false,
                exhaustFan: false,
                tv: false,
                kipasAngin: false
            },
            data: [],
            dataProvinces: [],
            dataCities: [],
            dataSubdistrict: [],
            showHideForm: true
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleCancleFilter = this.handleCancleFilter.bind(this)
    }

    componentDidMount() {
        this.setDataProvinces()
    }

    setDataProvinces() {
        const { provinces } = this.props
        const listProvinces = JSON.parse(provinces)
        const dataProvinces = []
        new Promise((resolve, reject) => {
            const p = listProvinces.reduce((acc, curr, i, arr) => dataProvinces.push(curr.name), [])
            resolve(p)
        }).then(() => {
            this.setState({ dataProvinces })
        })
    }

    setDataCities(provinceName) {
        const { provinces } = this.props
        const listProvinces = JSON.parse(provinces)
        const dataCities = listProvinces.find(item => item.name === provinceName).city
        this.setState({ dataCities })
    }

    setDataSubdistrict(cityName) {
        const { dataCities } = this.state
        const dataSubdistrict = dataCities.find(item => item.name === cityName).subdistrict
        this.setState({ dataSubdistrict })
    }

    handleChange = (event) => {
        const nam = event.target.name
        const val = event.target.value

        if (nam === 'price') {
            this.setState({
                rangePrice: { min: 100000, max: parseInt(val, 10) }
            })
        }

        if (nam === 'province') {
            this.setDataCities(val)
        }

        if (nam === 'city') {
            this.setDataSubdistrict(val)
        }
        
        this.setState({ [nam]: val })
        nam === 'province' && this.setState({ city: '---Semua---', district: '---Semua---' })
        nam === 'city' && this.setState({ district: '---Semua---' })
    }
    handleCancleFilter() {
        const { showHideForm } = this.state
        this.setState({ showHideForm: !showHideForm })
    }
    handleSearch(event) {
        event.preventDefault()
        const { duration, province, city, district, rangePrice, facilities } = this.state
        let facilitiesRoom = []
        facilities.ac && facilitiesRoom.push("AC")
        facilities.wifi && facilitiesRoom.push("Wifi")
        facilities.kamarMandiDalam && facilitiesRoom.push("Kamar Mandi Dalam")
        facilities.kasur && facilitiesRoom.push("Kasur")
        facilities.lemariPakaian && facilitiesRoom.push("Lemari Pakaian")
        facilities.meja && facilitiesRoom.push("Meja")
        facilities.kursi && facilitiesRoom.push("Kursi")
        facilities.exhaustFan && facilitiesRoom.push("Exhaust Fan")
        facilities.tv && facilitiesRoom.push("TV")
        facilities.kipasAngin && facilitiesRoom.push("Kipas Angin")
        this.props.callbackFromParent({ duration, province, city, district, facilitiesRoom, rangePrice });
    }
    toggleAc = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                ac: !facilities.ac
            }
        }))
    }
    toggleWifi = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                wifi: !facilities.wifi
            }
        }))
    }
    toggleKamarMandiDalam = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kamarMandiDalam: !facilities.kamarMandiDalam
            }
        }))
    }
    toggleKasur = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kasur: !facilities.kasur
            }
        }))
    }
    toggleLemariPakaian = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                lemariPakaian: !facilities.lemariPakaian
            }
        }))
    }
    toggleMeja = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                meja: !facilities.meja
            }
        }))
    }
    toggleKursi = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kursi: !facilities.kursi
            }
        }))
    }
    toggleExhaustFan = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                exhaustFan: !facilities.exhaustFan
            }
        }))
    }
    toggleTv = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                tv: !facilities.tv
            }
        }))
    }
    toggleKipasAngin = () => {
        const { facilities } = this.state
        this.setState(prevState => ({
            facilities: {
                ...prevState.facilities,
                kipasAngin: !facilities.kipasAngin
            }
        }))
    }
    render() {
        const { showHideForm, province, city, district, facilities, rangePrice, dataProvinces, dataCities, dataSubdistrict } = this.state
        return <>
            {
                showHideForm &&
                <div>

                    <form className="bg-white uppercase" onSubmit={this.handleSearch}>
                        <div className="p-3">

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="province">Provinsi</label>
                                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="province"
                                    name="province"
                                    value={province}
                                    onChange={this.handleChange}>
                                    {
                                        dataProvinces
                                            .sort(function (a, b) {
                                                var nameA = Generateslug(a.toUpperCase());
                                                var nameB = Generateslug(b.toUpperCase());
                                                if (nameA < nameB) return -1;
                                                if (nameA > nameB) return 1;
                                                return 0;
                                            })
                                            .map((item, index) => <option key={index}>{item}</option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">Kota</label>
                                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city"
                                    name="city"
                                    value={city}
                                    onChange={this.handleChange}>
                                    <option>{city}</option>
                                    {
                                        dataCities
                                            .sort(function (a, b) {
                                                var nameA = Generateslug(a.name.toUpperCase());
                                                var nameB = Generateslug(b.name.toUpperCase());
                                                if (nameA < nameB) return -1;
                                                if (nameA > nameB) return 1;
                                                return 0;
                                            })
                                            .map((city, index) => <option key={index}>{city.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Kecamatan</label>
                                <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="district"
                                    name="district"
                                    value={district}
                                    onChange={this.handleChange}>
                                    <option>{district}</option>
                                    {
                                        dataSubdistrict
                                            .sort(function (a, b) {
                                                var nameA = Generateslug(a.name.toUpperCase());
                                                var nameB = Generateslug(b.name.toUpperCase());
                                                if (nameA < nameB) return -1;
                                                if (nameA > nameB) return 1;
                                                return 0;
                                            })
                                            .map((area, index) => <option key={index}>{area.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="text-gray-700 mt-2">
                                <label className="block text-sm font-bold mb-n1" htmlFor="facilityRoom">Fasilitas Kamar</label>
                                <div className="capitalize grid grid-cols-3 gap-2 my-2 text-sm">
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.ac ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={this.toggleAc}>AC</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="ac" label="AC" checked={facilities.ac} onChange={this.toggleAc} custom />
                                    </div>
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.wifi ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={this.toggleWifi}>Wifi</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="wifi" label="Wifi" checked={facilities.wifi} onChange={this.toggleWifi} custom />
                                    </div>
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.kamarMandiDalam ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500 clamp-1'}`} onClick={this.toggleKamarMandiDalam}>KM Dalam</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="kamarMandiDalam" label="KM.Dalam" checked={facilities.kamarMandiDalam} onChange={this.toggleKamarMandiDalam} custom />
                                    </div>
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.kasur ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={this.toggleKasur}>Kasur</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="kasur" label="Kasur" checked={facilities.kasur} onChange={this.toggleKasur} custom />
                                    </div>
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.lemariPakaian ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={this.toggleLemariPakaian}>Lemari</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="lemariPakaian" label="Lemari" checked={facilities.lemariPakaian} onChange={this.toggleLemariPakaian} custom />
                                    </div>
                                    <div className="mb-n1">
                                        <div className={`rounded-md cursor-pointer my-1 p-1 text-center ${facilities.meja ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'}`} onClick={this.toggleMeja}>Meja</div>
                                        <input type="checkbox" className="mt-2 mr-sm-2 hidden" id="meja" label="Meja" checked={facilities.meja} onChange={this.toggleMeja} custom />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">Harga Maksimum</label>
                                <input
                                    className="w-full"
                                    type="range"
                                    name="price"
                                    min={200000}
                                    max={5000000}
                                    step={200000}
                                    onChange={this.handleChange} />
                                {Cash(rangePrice.max)}
                            </div>
                        </div>
                        <div className="border-top pt-2 px-3">
                            <button className="bg-indigo-700 hover:bg-indigo-600 focus:outline-none text-white font-bold py-3 px-3 my-2 mr-3 rounded-md w-full uppercase" type="submit">Terapkan</button>
                        </div>
                    </form>
                </div>
            }
        </>
    }
}
export default Filter