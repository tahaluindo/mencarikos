import React from "react"
import { string } from 'prop-types'
import { ImWarning, ImInfo } from 'react-icons/im'
const Message = (props) =>
  <>
    <div className={`${props.type === 'info' ? 'info border-blue-200 text-blue-700' : 'warning border-red-200 font-bold'} border-b-4 px-4 py-3`} role="alert">
      {/* {props.title && <p className="font-bold">{props.title}</p>} */}
      <div className="flex">
        <div className="self-center mr-3">
          {
            props.type === 'info' ? <ImInfo size={30} /> : <ImWarning size={40} color="#B91C1C" />
          }
        </div>
        <p className="text-sm self-center">
          {props.message} {props.url && <a href={props.url}><u>{props.urlTitle}</u></a>}
        </p>
      </div>
    </div>
    <style jsx>
      {`
        .warning{
          background-color: #FEE2E2;                 
        }
        .info{
          background-color: #DBEAFE;
        }
      `}
    </style>
  </>
Message.propTypes = {
  type: string,
  title: string,
  message: string,
  url: string,
  urlTitle: string,
}
Message.defaultProps = {
  type: 'info',
  title: null,
  message: null,
  url: null,
  urlTitle: null,
}
export default Message