import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/client'
import Header from '../components/Header'
export default function Account() {
    const [session, loading] = useSession()
    const handleLogout = () => signOut({ callbackUrl: '/' })
    const seo = {
        title: 'Akun - Informasi Akun Saya | Tantekos.com',
        description: 'Informasi Profil dan Iklan Pengguna.',
        url: 'account',
        keyword: 'akun saya, iklan saya, buat iklan',
        image: 'i2aQSZ9'
    }
    return <>
        <Header seo={seo} />
        {
            !loading && session &&
            <div className="mx-3 divide-y-2 divide">
                <div className="flex py-3">
                    <div className="relative"><img src={session.user.image} alt={session.user.name} className="w-12 h-12 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} /></div>
                    <div className="ml-2">
                        <div>Hallo,</div>
                        <div className="text-lg font-bold">{session.user.name}</div>
                    </div>
                </div>
                <Link href="/iklansaya" passHref>
                    <div className="py-3 cursor-pointer">Iklan Saya</div>
                </Link>
                {
                    session.user.email === process.env.NEXT_PUBLIC_REACT_APP_EMAIL &&
                    <Link href="/addnew" passHref>
                        <div className="py-3 cursor-pointer">
                            Tambah Iklan
                        </div>
                    </Link>
                }
                <div className="py-3 cursor-pointer" onClick={handleLogout}>
                    Keluar
                </div>
            </div>
        }
    </>
}