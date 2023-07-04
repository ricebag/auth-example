import type { Dispatch, SetStateAction } from "react"

import { useState, } from "react"
import { api } from "../utils/api"
import { EventModal, Loader } from "./"

type EventsComponentTypes = {
    groupId: string,
    showModal: boolean,
    toggleModal: Dispatch<SetStateAction<boolean>>
}

export default function Events({ groupId, showModal, toggleModal }: EventsComponentTypes) {
    const [selectedId, setSelectedId] = useState<string>("")

    const { data: events, refetch: refetchEvents, isLoading } = api.events.getEventsByGroupId.useQuery(groupId)

    return (
        <div>
            <div className="mt-6 flow-root">
                <ul role="list" className="-my-5 divide-y divide-gray-200">
                    {events?.map((event) => (
                        <li key={event.id} className="p-4 hover:bg-slate-100">
                            <div className="flex items-center space-x-4">
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-gray-900">{event.title}</p>
                                    <p className="truncate text-sm text-gray-500">{event.start.toDateString()}</p>
                                </div>
                                {/* <GroupIcons users={event.guests} /> */}
                                <div>
                                    <a
                                        href="#"
                                        className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => setSelectedId(event.id)}
                                    >
                                        Edit
                                    </a>
                                </div>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
            <EventModal
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                display={showModal}
                toggleModal={toggleModal}
                refetchEvents={refetchEvents}
                groupId={groupId}
            />

            <Loader show={isLoading} />
        </div>
    )
}