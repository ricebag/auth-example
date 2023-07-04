import { Prisma } from "@prisma/client"
import { api } from "../utils/api"

const eventsWithPeople = Prisma.validator<Prisma.EventArgs>()({
    include: {
        peopleEvents: { include: { user: true } }
    },
})
type Events = Prisma.EventGetPayload<typeof eventsWithPeople>

export default function Events({ groupId, editEvent }: { groupId: string, editEvent: (id: string) => void }) {
    const { data: events } = api.events.getEventsByGroupId.useQuery(groupId)

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
                                        onClick={() => editEvent(event.id)}
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

            {/* view more functionality?
            <div className="mt-6">
                <a
                    href="#"
                    className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                >
                    View all
                </a>
            </div> */}
        </div>
    )
}