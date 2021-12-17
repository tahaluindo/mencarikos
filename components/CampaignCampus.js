import React, { useEffect, useState } from 'react'
import fire from '../configurations/firebase'
import Link from 'next/link'
import { BiChevronRight, BiMap } from 'react-icons/bi'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Generateslug from '../utils/Generateslug'
function CampaignCampus() {
    const [universities, setUniversities] = useState([])
    const [load, setLoad] = useState(true)
    const getData = () => {
        return new Promise(async (resolve, reject) => {
            const querySnapshot = await fire.firestore().collection('provinces').get()
            const provinces = querySnapshot.docs.map(doc => doc.data())
            let universities = []
            provinces.forEach(province => {
                if (province.universities) {
                    province.universities.forEach(university => {
                        university.is_popular && universities.push({ province: province.name, universities: university })
                    })
                }
            })
            resolve(universities)
        })
    }
    useEffect(() => {
        getData().then((universities) => {
            setUniversities(universities)
            setLoad(false)
        })
    }, [])
    return (
        <div className="divide-y">
            {
                load ?
                    <div className="text-center">
                        <AiOutlineLoading3Quarters size={16} className="animate-spin inline mr-1 mb-1" />
                    </div>
                    :
                    <>
                        {
                            universities && universities
                                .sort((a, b) => (a.universities.name < b.universities.name ? -1 : 1))
                                .map((university, index) =>
                                    <Link key={index} href={`area/kampus/${Generateslug(university.universities.name)}?province=${Generateslug(university.province)}`} passHref>
                                        <div className="flex py-2">
                                            <div className="w-full mt-n1 self-center items-center cursor-pointer">
                                                <h3 className="text-xl clamp-1 leading-tight mr-4 font-bold text-gray-800">
                                                    <BiMap className="inline mr-1 mb-1" size={16} />{university.universities.name}
                                                </h3>
                                            </div>
                                            <div className="self-center">
                                                <BiChevronRight size={24} className="ml-1 mb-1" />
                                            </div>
                                        </div>
                                    </Link>
                                )
                        }
                        <Link href="/area/kampus" passHref>
                            <div className="align-middle text-center azure font-bold uppercase py-2 cursor-pointer">Kampus Lainnya <BiChevronRight size={24} className="ml-1 mb-1 inline" /></div>
                        </Link>
                    </>
            }
        </div>
    )
}
export default CampaignCampus