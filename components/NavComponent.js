import React, { Fragment } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { signIn, useSession } from 'next-auth/client'
const navigation = [
  { name: 'Terdekat', href: '/nearby', current: false },
  { name: 'Favorit', href: '/favorites', current: false }
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function NavComponent() {
  const [session] = useSession()
  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-20">
      {({ open }) => (
        <nav>
          <div className="max-w-8xl mx-auto">
            <div className="relative flex items-center justify-between h-14">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <AiOutlineMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="ml-2 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <a href="/">
                  <div className="cursor-pointer text-white font-bold flex-shrink-0 flex items-center">
                    <div className="block lg:hidden">TANTEKOS</div>
                    <div className="hidden lg:block">TANTEKOS</div>
                  </div>
                </a>
                <div className="hidden sm:block sm:ml-6">
                  <div className="space-x-2" itemScope="itemscope" itemType="http://www.schema.org/SiteNavigationElement">
                    <a href="/" itemProp="hasPart">
                      <span className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 font-medium">
                        Beranda
                      </span>
                    </a>
                    {navigation.map((item) => (
                      <a key={item.name} href={item.href} aria-current={item.current ? 'page' : undefined} itemProp="hasPart">
                        <span className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 font-medium">
                          {item.name}
                        </span>
                      </a>
                    ))}
                    {/* <a href="http://fumacrom.com/1AKOa" itemProp="hasPart">
                      <span className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 font-medium">
                        Search
                      </span>
                    </a> */}
                  </div>
                </div>
              </div>
              {
                !session ?
                  <AiOutlineUser className="mr-2 text-gray-300 bg-gray-500 rounded-full cursor-pointer" size={32} onClick={() => signIn()} />
                  :
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-2">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <span>
                                <img className="rounded-full h-8 w-8" src={session.user.image} alt={session.user.name} />
                              </span>
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/account"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Akun
                                  </a>
                                )}
                              </Menu.Item>
                              {
                                session.user.email === process.env.NEXT_PUBLIC_REACT_APP_EMAIL &&
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link href="/addnew" passHref>
                                      <span className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                                        Tambah Iklan
                                      </span>
                                    </Link>
                                  )}
                                </Menu.Item>
                              }
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
              }
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </nav>
      )}
    </Disclosure>
  )
}