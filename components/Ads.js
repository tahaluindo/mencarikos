import React from 'react'
import Link from 'next/link'
export default function Ads() {
    return <Link href="post" passHref>
        <div className="text-center text-white py-4 px-3 border bg-indigo-800 cursor-pointer">
            <p>Ingin lihat kost Kamu di Tantekos?</p>
            <p>Ayo, pasang iklan kost secara Gratis.</p>
            <div className="rounded-full align-middle border text-center text-white font-bold uppercase mt-3 py-3 mx-3">
                <span>Pasang Iklan Gratis</span>
            </div>
        </div>
    </Link>
}