import React, { useEffect, useRef } from 'react'
import { RiCloseFill } from 'react-icons/ri'

const Modal = (props) => {
    const wrapperRef = useRef(null);
    const useOutsideAlerter = (ref) => {
        useEffect(() => {

            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.onHide()
                    // document.body.style.overflow = "scroll"
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);

    if (!props.show) {
        return null
    }
    return (
        <>
            <div className="modal fixed inset-0 flex justify-center">
                <div className="modal-content">
                    <div className="modal-header text-white p-3 bg-gray-700">
                        <span>{props.title}</span>
                        <span className="float-right cursor-pointer" onClick={props.onHide}><RiCloseFill size={22} />
                        </span>
                    </div>
                    <div ref={wrapperRef} className="filter drop-shadow-lg">
                        {props.body}
                    </div>
                </div>
            </div>
            <style global jsx>{`
                .modal{
                    background-color: rgba(0,0,0,.75);
                    z-index: 60;
                }
                .modal-content{
                    width: 100vw;
                }
            `}</style>
        </>
    )
}
export default Modal