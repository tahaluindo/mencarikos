import React from "react";
import Generateslug from '../utils/Generateslug'
import fire from '../configurations/firebase'

const sitemapXml = (provinces, dataKostKontrakan) => {
  let latestPost = 0
  let areasXML = ""
  let subdistrictXML = ""
  let kostkontrakanXML = ""

  let subdistrict = []
  let cities = []
  provinces.forEach(province => {
    province.city.forEach(city => {
      cities.push({ name: city.name })
      city.subdistrict.forEach(s => {
        subdistrict.push({ name: s.name })
      })
    })
  })

  cities.map(area => {
    const areaURL = `https://www.tantekos.com/area/kota/${Generateslug(area.name)}`;
    areasXML += `
        <url>
          <loc>${areaURL}</loc>
        </url>`
  })

  subdistrict.map(subdistrict => {
    const subdistrictURL = `https://www.tantekos.com/area/${Generateslug(subdistrict.name)}`;
    subdistrictXML += `
        <url>
          <loc>${subdistrictURL}</loc>
        </url>`
  })

  dataKostKontrakan.map(post => {
    const postDate = new Date(post.date_published).toISOString();
    if (!latestPost || postDate > latestPost) {
      latestPost = postDate;
    }
    const itemURL = `https://www.tantekos.com/${Generateslug(post.title)}`;
    kostkontrakanXML += `
      <url>
        <loc>${itemURL}</loc>
        <lastmod>${postDate}</lastmod>
        <priority>0.50</priority>
      </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.tantekos.com/</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://www.tantekos.com/about</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://www.tantekos.com/contact</loc>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://www.tantekos.com/policy</loc>
        <priority>1.00</priority>
      </url>
      ${kostkontrakanXML}
      ${areasXML}
      ${subdistrictXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    let DtKostKontrakan = []
    const querySnapshot = await fire.firestore()
      .collection('kosts')
      .orderBy('date_published', 'asc')
      .get()
    querySnapshot.forEach(doc => {
      DtKostKontrakan.push({
        id: doc.id,
        date: doc.date_modified,
        ...doc.data()
      })
    })

    let provinces = []
    const queryProvinces = await fire.firestore()
      .collection('provinces')
      .get()
    queryProvinces.forEach(doc => {
      provinces.push({ id: doc.id, ...doc.data() })
    })

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemapXml(provinces, DtKostKontrakan));
    res.end();
  }
}
export default Sitemap