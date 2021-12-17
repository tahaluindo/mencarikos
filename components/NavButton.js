import React from 'react'
import Link from "next/link"
import { string, shape } from 'prop-types'
const NavButton = props => (
  <Link href={props.path} passHref>
    <div className={`flex flex-col justify-around items-center h-full w-full cursor-pointer ${props.color}`}>
      <div className="text-3xl">{props.icon}</div>
      <span className="font-bold uppercase text-xs">{props.label}</span>
    </div>
  </Link>
)
NavButton.propTypes = {
  path: string,
  color: string,
  icon: shape({}),
  label: string,
}
NavButton.defaultProps = {
  path: null,
  color: null,
  icon: null,
  label: null,
}
export default NavButton