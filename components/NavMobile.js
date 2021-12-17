import React from 'react'
import { useRouter } from 'next/router'
import NavButton from "./NavButton"
import { RiHeartFill, RiHeartLine } from 'react-icons/ri'
import { HiLocationMarker, HiOutlineLocationMarker } from 'react-icons/hi'
import { BiSearchAlt, BiSearch, BiHome } from 'react-icons/bi'

function NavMobile() {
  const router = useRouter()
  const navButtons = [
    {
      label: "Beranda",
      path: "/",
      icon: router.pathname === '/' ? <BiHome /> : <BiHome />,
      color: router.pathname === '/' ? 'azure' : 'text-gray-700'
    },
    {
      label: "Terdekat",
      path: "/nearby",
      icon: router.pathname === '/nearby' ? <HiLocationMarker /> : <HiOutlineLocationMarker />,
      color: router.pathname === '/nearby' ? 'azure' : 'text-gray-700'
    },
    {
      label: "Favorit",
      path: "/favorites",
      icon: router.pathname === '/favorites' ? <RiHeartFill /> : <RiHeartLine />,
      color: router.pathname === '/favorites' ? 'azure' : 'text-gray-700'
    },
    {
      label: "Cari Kost",
      path: "/search/kost",
      icon: router.pathname === '/search/kost' ? <BiSearchAlt /> : <BiSearch />,
      color: router.pathname === '/search/kost' ? 'azure' : 'text-gray-700'
    }
  ]
  return (
    <>
      {navButtons.map(button => (
        <NavButton
          key={button.path}
          path={button.path}
          label={button.label}
          icon={button.icon}
          color={button.color}
        />
      ))}
    </>
  )
}
export default NavMobile