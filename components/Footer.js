import React from 'react'
import Link from 'next/link'
export default function Footer() {
    return <footer className="h-20">
        <div className="xs:hidden text-center py-3 border-t">
            <div className="text-sm azure">
                <Link href="/">Beranda</Link> &middot; <Link href="/about">Tentang Kami</Link> &middot; <Link href="/contact">Kontak</Link> &middot; <Link href="/policy">Kebijakan Privasi</Link>
            </div>
            <small className="text-gray-700">&copy; 2021-{new Date().getFullYear()} MencariKOS. All Rights Reserved.</small>
        </div>
    </footer>
}
