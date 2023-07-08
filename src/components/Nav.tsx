import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from "next/link"
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import { useRouter } from 'next/router';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Tabs = 'Dashboard' | 'Friends' | 'Groups' | ''

const Nav = () => {
  const navigation = [
    // { name: 'Dashboard', href: '/', current: false },
    { name: 'Friends', href: '/connections', current: true },
    { name: 'My Groups', href: '/groups', current: false },
  ]

  const [selectedTab, updateSelectedTab] = useState<Tabs>('')
  const { asPath } = useRouter()
  const { data: session } = useSession();

  useEffect(() => {
    if (asPath !== selectedTab) {
      const tab = asPath.split('/')[1] as Tabs
      updateSelectedTab(tab)
    }
  }, [asPath, selectedTab]);

  return (
    <Disclosure as="nav" className={`absolute w-full z-50 ${selectedTab === '' ? 'bg-transparent' : 'bg-gray-800'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md lg:p-2 pl-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <h1 className='text-white font-bold self-center hover:cursor-pointer       lg:text-3xl md:text-2xl text-sm'>
                  <Link href='/'>
                    WEEZZ.
                  </Link>
                </h1>

                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.href.split('/')[1] === selectedTab ? 'bg-gray-900' : 'hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium text-white'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <button
                  type="button"
                  className={`rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className={`flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        alt=""
                        width='200'
                        height='200'
                        src={session?.user?.image
                          ? session.user.image
                          : '/avatar.svg'}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >


                    {!session
                      ? (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {/* <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={'/register'}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >Register</Link>
                            )}
                          </Menu.Item> */}

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href={'/login'}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >Login</Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )
                      : (
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                                onClick={() => void signOut({ callbackUrl: '/login' })}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      )}
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )
      }
    </Disclosure >
  )
}













// import Link from "next/link"
// import { signOut, useSession } from "next-auth/react";

// // import { api } from "../utils/api";

// const Nav = () => {
//   const { data: session } = useSession();

//   const Buttons = !!session ? (
//     <button
//       className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9"
//       onClick={() => void signOut({ callbackUrl: '/login' })}
//     >Logout</button>
//   ) : (
//     <Link
//       href={'/login'}
//       className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9"
//     >Login</Link>
//   )

//   return (
//     <nav className="flex justify-between item-centre py-10">
//       <Link href={'/'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">Logo</Link>
//       <Link href={'/connections'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">Connections</Link>
//       <Link href={'/calendar'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">Calendar</Link>
//       {Buttons}
//     </nav>
//   )
// }

export default Nav
