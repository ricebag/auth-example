import { type Group, Prisma } from "@prisma/client"

const groupsWithPeople = Prisma.validator<Prisma.GroupArgs>()({
    include: {
        peopleGroups: { include: { user: true } }
    },
})
type Groups = Prisma.GroupGetPayload<typeof groupsWithPeople>

export default function Groups({ groups, onGroupClick }: { groups?: Groups[], onGroupClick: (group: Group) => void }) {
    const formattedGroups = groups?.map((group) => ({
        ...group,
        guests: group?.peopleGroups?.map((groupPerson) => groupPerson.user),
    }))

    return (
        <div className="mt-6 flow-root">
            <ul role="list" className="-my-2 divide-y divide-gray-200">
                {formattedGroups?.map((group) => (
                    <li key={group.id} className="p-4 hover:bg-slate-100 cursor-pointer" onClick={() => onGroupClick(group)}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="h-8 w-8 rounded-full" src={group.image} alt="" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-m font-medium text-gray-900">{group.title}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}