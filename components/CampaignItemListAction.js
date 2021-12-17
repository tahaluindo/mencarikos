import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { facility, type, duration } from './Campaign'
import Link from 'next/link'
class CampaignItemListAction extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false }
    }
    componentDidMount() {
        const { item } = this.props
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === item.id).length
        if (findFav > 0) this.setState({ like: true })
    }
    render() {
        const { item } = this.props
        const newItem = {
            category: item.category,
            date_view: Date.now(),
            facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
            id: item.id,
            images: item.images,
            location: {
                city: item.location.city, district: item.location.district, near: item.location.near, province: item.location.province
            },
            name: item.name,
            price: { start_from: item.price.start_from, duration: item.price.duration },
            slug: item.slug,
            title: item.title,
            type: item.type
        }
        const handleLastView = () => {
            let lastView = localStorage.getItem('lastview')
            let data
            if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
            const findData = data.filter(i => i.id === newItem.id).length
            if (data.length > 14) { data.shift() }
            if (findData === 0) {
                data.push(newItem)
                localStorage.setItem('lastview', JSON.stringify(data))
            }
        }
        return (
            <div className="w-full overflow-hidden divide-gray-100 py-2 flex cursor-pointer" onClick={() => handleLastView(item)}>
                <div className="container-image w-20 bg-gray-400">
                    <Link href={`/${item.slug}`} passHref>
                        <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="object-cover object-center float-left mr-2 w-20 h-24" onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                    </Link>
                    <MdClose className="button-delete bg-gray-700 text-white rounded-full p-1 mt-1 ml-1" size="24" onClick={() => this.props.callbackFromParent(item)} />
                </div>
                <Link href={`/${item.slug}`} passHref>
                    <div className="flex-1 ml-2 self-center">
                        <div className="font-bold">
                            {Cash(item.price.start_from)}<span className="text-xs text-gray-700 uppercase"> / {duration(item.price.duration)}</span>
                        </div>
                        <div className="clamp-1">
                            <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                        </div>
                        <div className="clamp-1 leading-none">{facility(item.facility.room)}</div>
                        <div className="w-full">
                            <span className="text-green-800 text-xs uppercase font-bold">{type(item.type)}</span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
CampaignItemListAction.propTypes = {
    item: shape({}),
    callbackFromParent: func
}
CampaignItemListAction.defaultProps = {
    item: null,
    callbackFromParent: null
}
export default CampaignItemListAction;