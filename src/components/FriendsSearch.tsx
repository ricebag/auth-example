import { useState, Fragment, type SetStateAction, } from "react"
import { type User } from "@prisma/client"
import Image from "next/image"

import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'


const FriendSearch = ({ friends, selectedGuests, setSelectedGuests }: { friends: User[] | undefined, selectedGuests: User[] | [], setSelectedGuests: (value: SetStateAction<User[]>) => void }) => {
    const [query, setQuery] = useState('')

    const filteredUsers = friends?.filter((user) =>
        user?.name?.toLowerCase().includes(query.toLowerCase().trim()) ||
        user?.email?.toLowerCase().includes(query.toLowerCase().trim())
    )

    return (
        <Combobox value={selectedGuests} onChange={(value) => setSelectedGuests(value)} multiple>
            <div className="relative mt-1">
                <div className="relative block w-full cursor-default overflow-hidden rounded-md bg-white text-left border border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={() => ''}
                        placeholder='Search Friends...'
                        onChange={(event: { currentTarget: { value: SetStateAction<string> } }) => setQuery(event.currentTarget.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                        {!filteredUsers || filteredUsers.length === 0 && query !== '' ? (
                            <div className="relative cursor-pointer select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredUsers.map((friend) => (
                                <Combobox.Option
                                    key={friend.id}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'} flex`
                                    }
                                    value={friend}
                                >
                                    {({ selected, active }: { selected: boolean, active: boolean }) => (
                                        <>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}

                                            <Image
                                                width='10'
                                                height='10'
                                                unoptimized
                                                className="h-10 w-10 rounded-full"
                                                src={friend.image ? friend.image : 'https://cdn.discordapp.com/embed/avatars/0.png'}
                                                alt=""
                                            />
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">{friend.name}</p>
                                                <p className="text-sm text-gray-500">{friend.email}</p>
                                            </div>
                                        </>
                                    )}

                                </Combobox.Option>
                            ))
                        )}

                        <button className="relative cursor-pointer select-none py-2 px-4 text-gray-700">
                            {`Add Friend + (this doesn't do anything yet)`}
                        </button>
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox >
    )
}

export default FriendSearch
