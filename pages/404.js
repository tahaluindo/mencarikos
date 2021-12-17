import React from 'react';
import Message from '../components/Message';
export default function Custom404() {
    return <div className="flex h-screen">
        <div className="m-auto">
            <Message title="Kesalahan 404" message="Halaman tidak ditemukan" url="/" urlTitle="Kembali ke Beranda." />
        </div>
    </div>
}