import React from 'react'
import Header from '../components/Header'
export default function Index() {
  const seo = {
    title: 'Tentang Kami | Tantekos.com',
    description: 'Tentang Layanan Informasi Kost dan Kontrakan yang Kami Sediakan Selalu Terupdate Setiap Hari.',
    url: 'about',
    keyword: 'tentang kami, layanan kos, informasi kos',
    image: 'i2aQSZ9'
  }
  return (
    <>
      <Header seo={seo} />
      <div className="my-3 mx-3 text-center leading-relaxed" style={{ textAlign: '-webkit-center' }}>
        <img src="/static/images/logo.png" width={100} height={100} alt="logo_tantekos" />
        <h1 className="text-2xl py-3">Tentang Kami</h1>
        <p>Kami bangga menyediakan layanan informasi akomodasi di Indonesia. Layanan ini bersifat Gratis dan hanya dapat digunakan sebagai informasi tambahan. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya.</p>
        <p>Konten website berasal dari Group Facebook yang dikelola Tantekos dan Layanan Google Map. Konten telah disaring menjadi informasi yang dapat digunakan untuk menemukan akomodasi yang cocok untuk pengguna. Perkenankan Kami menyampaikan terima kasih atas dukungan dan partisipasi menjaga layanan Tantekos tetap sehat.</p>
      </div>
    </>
  )
}