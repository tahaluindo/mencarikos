import React from 'react'
import fire from '../configurations/firebase'
import CampaignItemList from '../components/CampaignItemList'
import Message from '../components/Message'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import { getSession } from 'next-auth/client'
import Header from '../components/Header'
class IklanSaya extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            load: true
        }
    }
    async componentDidMount() {
        const session = await getSession()
        if (session) {
            const dt = fire.firestore().collection('kosts')
            dt.where('user.email', '==', session.user.email)
                .orderBy('date_modified', 'desc')
                .onSnapshot(snapshot => {
                    const data = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    this.setState({ data, load: false })
                })
        }
    }
    render() {
        const { data, load } = this.state
        const seo = {
            title: 'Iklan Saya - Daftar Kost & Kontrakan Saya | Tantekos.com',
            description: 'Semua Kost & Kontrakan Saya.',
            url: 'iklansaya',
            keyword: 'kost saya, daftar kost saya',
            image: 'i2aQSZ9'
        }
        return <>
            <Header seo={seo} />
            {
                load ? <CampaignItemListSkeleton /> :
                    data && data.length > 0 &&
                    <div className="my-2">
                        <div className="mx-3 divide-y">
                            {
                                data
                                    .sort((a, b) => (a.price.start_from < b.price.start_from ? -1 : 1))
                                    .map((item, index) => <div key={index}><CampaignItemList item={item} myads /></div>)
                            }
                        </div>
                    </div>
            }
            {
                data && data.length === 0 &&
                <div>
                    <Message title="No Ad" message="You have no ads. Create Your ad for free now" />
                </div>
            }
        </>
    }
}
export default IklanSaya