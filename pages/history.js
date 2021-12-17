import React from 'react'
import Header from '../components/Header'
import Histories from '../components/Histories'
export default function History() {
    const seo = {
        title: 'History - Daftar Kost & Kontrakan Terakhir Dilihat | Tantekos.com',
        description: 'Daftar Kost & Kontrakan yang Terakhir Saya Lihat.',
        url: 'history',
        keyword: 'history kost, kost terakhir dilihat',
        image: 'i2aQSZ9'
    }
    return (
        <>
            <Header seo={seo} />
            <div className="container grid sm:grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                    <Histories />
                </div>
                <div />
            </div>
        </>
    )
}