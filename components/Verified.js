import React from 'react'
import Link from 'next/link'
import { shape } from 'prop-types'
import Message from './Message'
import Generateslug from '../utils/Generateslug';
import { BsCheckCircle } from 'react-icons/bs'
import { BiMap } from 'react-icons/bi'
function Verified({ data }) {
    return (
        <div className="mb-2">
            {
                data.verified ?
                    <div className="flex pb-2 border-b">
                        <BsCheckCircle className="mt-1 mr-2 text-green-600 rounded-full" size={42} />
                        <div>
                            <div className="my-n1">
                                <span className="font-bold mr-1">{data.name}</span>&middot;
                                <Link href={`/area/${Generateslug(data.district)}`} passHref>
                                    <span className="font-bold rounded ml-1 azure cursor-pointer">
                                        <BiMap size={16} className="inline mb-1" />{data.district}
                                    </span>
                                </Link>
                            </div>
                            <div className="text-green-600 text-sm font-bold">
                                Terverifikasi
                            </div>
                        </div>
                    </div>
                    :
                    <Message type="danger" title="PERINGATAN" message="Hati-hati penipuan!!! Lakukan pembayaran (DP atau pelunasan) setelah mengunjungi lokasi kost." />
            }
        </div>
    )
}
Verified.propTypes = { data: shape({}) }
Verified.defaultProps = { data: null }
export default Verified;