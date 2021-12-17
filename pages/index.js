import React from 'react'
import { string } from 'prop-types'
import Header from '../components/Header'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import Search from '../components/Search'
import Message from '../components/Message'
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      kosts: props.kosts,
      sponsored: props.sponsored,
      data: null,
      placeName: null
    }
    this.searchCallBack = this.searchCallBack.bind(this)
  }

  searchCallBack(data, placeName) { this.setState({ data, placeName }) }

  render() {
    const { data, placeName } = this.state
    const { kosts, sponsored } = this.props
    const dataSponsored = JSON.parse(sponsored)
    const dataKost = JSON.parse(kosts)
    const feed = dataKost.slice(0, 5)
    const seo = {
      title: 'Cari Kost Murah Terdekat | Tantekos',
      description: 'Info Kost Murah Terdekat Sewa Harian Mingguan & Bulanan. Cari Kos Pria & Putri Terdekat Daerah Sini.',
      url: '',
      keyword: 'tantekos, kost, info kost, rumah kost, sewa kost, cari kost, kost murah, kost terdekat',
      image: 'i2aQSZ9'
    }
    return (
      <>

        <Header seo={seo} />

        <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4 mt-2">
          <div className="divide-y xs:border-b">
            <Search data={dataKost} searchCallBack={this.searchCallBack} />
            {
              data?.length === 0 &&
              <Message type="info" message={`Belum ada data kost sekitar ${placeName}`} />
            }
            {
              data?.length > 0 && placeName &&
              <div className="p-2 text-blue-600 font-bold">
                {`${data?.length} kost di sekitar ${placeName}`}
              </div>
            }
            {
              !placeName &&
              <h1 className="text-xl font-bold py-4 xs:px-2">Kost Murah Terdekat</h1>
            }
            <FeedsGrid data={data || feed} />
          </div>
          <div>
            <FeedsGrid data={dataSponsored} />
          </div>
        </div>

      </>
    )
  }
}
export const getServerSideProps = async () => {
  try {
    const snapshot = fire.firestore().collection('kosts')
    const querySnapshot = await snapshot
      .orderBy('date_published', 'desc')
      .get()
    const kosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    const querySnapshotSponsored = await snapshot
      .where('sponsored.display', '==', true)
      .limit(5)
      .get()
    const sponsored = querySnapshotSponsored.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return {
      props: {
        kosts: JSON.stringify(kosts),
        sponsored: JSON.stringify(sponsored)
      }
    }
  } catch (e) {
    console.log(e);
  }
}
Index.propTypes = { kosts: string, sponsored: string }
Index.defaultProps = { kosts: null, sponsored: null }
export default Index