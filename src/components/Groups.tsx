import { Prisma } from "@prisma/client"

const groupsWithPeople = Prisma.validator<Prisma.GroupArgs>()({
    include: {
        peopleGroups: { include: { user: true } },
        Message: true
    },
})
export type Groups = Prisma.GroupGetPayload<typeof groupsWithPeople>

export default function Groups({ groups, onGroupClick, selectedGroup }: { groups?: Groups[], onGroupClick: (group: Groups) => void, selectedGroup: Groups | undefined }) {
    const formattedGroups = groups?.map((group) => ({
        ...group,
        guests: group?.peopleGroups?.map((groupPerson) => groupPerson.user),
    }))

    return (
        <div className="mt-6 flow-root">
            <ul role="list" className="-my-2 divide-y divide-gray-200">
                {formattedGroups?.map((group) => (
                    <li key={group.id} className={`p-3 hover:bg-slate-100 cursor-pointer ${group.id === selectedGroup?.id ? 'bg-slate-100' : ''}`} onClick={() => onGroupClick(group)}>
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="h-8 w-8 rounded-full" src={group.image} alt="" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-m font-medium text-gray-900">{group.title}</p>
                                <p className="truncate text-xs text-gray-400">{group?.Message[group.Message.length - 1]?.message || ''}</p>
                            </div>
                        </div>
                    </li>
                ))}

                {!formattedGroups?.length && (
                    <div className="flex flex-col justify-center grow text-center pt-[10%]">
                        <p>You dont have any groups yet</p>
                        <p>To get started select the <strong>New Group</strong> button in the top right</p>
                    </div>
                )}
            </ul>
        </div>
    )
}