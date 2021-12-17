import React from 'react'
import NextHead from 'next/head'
import { shape } from 'prop-types'
function Header({ seo }) {
    const structureTypeWebsite = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: 'https://www.tantekos.com/',
        name: 'Tantekos',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.tantekos.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };
    const structureTypeOrganization = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Tantekos',
        alternateName: 'tantekos.com',
        url: 'https://www.tantekos.com/',
        logo: 'https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true',
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+6285243322433',
            contactType: 'customer service',
            areaServed: 'ID',
            availableLanguage: 'Indonesian'
        },
        sameAs: ['https://www.facebook.com/tantekos/', 'https://www.tantekos.com/', 'https://twitter.com/tantekos', 'https://www.instagram.com/tantekos_official/'
        ]
    };
    const structureTypeLocalBusiness = {
        '@context': 'https://schema.org',
        '@type': "LocalBusiness",
        address: {
            '@type': "PostalAddress",
            streetAddress: "Jl. Gudang Arang, Benteng, Nusaniwe",
            addressLocality: "Ambon",
            addressRegion: "Maluku",
            postalCode: "97117",
            addressCountry: "ID"
        },
        review: {
            '@type': "Review",
            reviewRating: {
                '@type': "Rating",
                ratingValue: 4,
                bestRating: 5
            },
            author: {
                '@type': "Person",
                name: "King Richard"
            }
        },
        "geo": {
            '@type': "GeoCoordinates",
            latitude: -3.703152,
            longitude: 128.162934
        },
        name: "tantekos.com",
        telephone: "+6285243322433",
        url: "https://www.tantekos.com/",
        image: "https://github.com/buqento/tantenextjs/blob/master/static/images/Home-icon.png?raw=true",
        priceRange: 'Rp 50.000 - Rp 15.000.000',
    }
    const structureHomePage = {
        '@graph': [
            structureTypeWebsite,
            structureTypeOrganization,
            structureTypeLocalBusiness
        ]
    };
    return (
        <>
            <NextHead>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
                <meta name="application-name" content="Tantekos" />
                <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta name="keywords" content={seo.keyword} />
                <meta property="og:image" content={`https://cdn.statically.io/img/i.imgur.com/${seo.image}.webp`} />
                <meta property="og:image:alt" content={seo.title} />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta property="fb:app_id" content="3234331779955939" />
                <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekos, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={seo.title} />
                <meta property="og:description" content={seo.description} />
                <meta property="og:url" content={`https://www.tantekos.com/${seo.url}`} />
                <link rel="canonical" href={`https://www.tantekos.com/${seo.url}`} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structureHomePage) }} />
            </NextHead>
        </>
    )
}
Header.propTypes = {
    seo: shape()
}
Header.defaultProps = {
    seo: null
}
export default Header