import type { NextPage } from "next";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

import { Button, Events, VerticleDivider, GroupModal, Groups, Loader, GroupChat } from '../components'
import { api } from "../utils/api";
import { type Groups as GroupsType } from '../components/Groups';

export type Selected = {
  view: {
    calendar: {
      unselect: () => void;
      addEvent: ({ id, title, start, end, allDay }: {
        id: string;
        title: string;
        start: string;
        end: string;
        allDay: boolean;
      }) => void;
    }
  };
  startStr: string;
  endStr: string;
  allDay: boolean;
  id: string;
}

const GroupsPage: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (!session && status !== 'loading') {
      void router.push('/login')
    }
    // if session.expired > date.now() sign the user out
  });

  const [showEventModal, toggleEventModal] = useState<boolean>(false)
  const [showGroupModal, toggleGroupModal] = useState<boolean>(false)

  const [selectedGroup, setSelectedGroup] = useState<GroupsType | undefined>()

  const { data: groups, refetch: refetchGroups, isFetching } = api.groups.getGroupsByUserId.useQuery()

  const onGroupClick = (nextGroup: GroupsType) => {
    if (selectedGroup?.id === nextGroup.id) setSelectedGroup(undefined)
    else setSelectedGroup(nextGroup)
  }

  const users = selectedGroup?.peopleGroups?.reduce((acc, peopleGroup) => {
    if (acc === '') return peopleGroup.user.name || ''
    if (peopleGroup?.user?.name) return `${acc}, ${peopleGroup?.user?.name}`
    return acc
  }, '')

  return (
    <div className='grow pt-16'>
      <div className='flex grow m-2'>
        <div className={`grow px-3 ${selectedGroup ? 'max-w-[25%]' : ''} pt-1`}>
          <div className='flex justify-between'>
            <h1 className='text-3xl'>Groups</h1>
            <Button className='self-center bg-indigo-400' variant={'default'} onClick={() => toggleGroupModal(!showGroupModal)}>New Group</Button>
          </div>
          <Groups groups={groups} onGroupClick={onGroupClick} selectedGroup={selectedGroup} />
        </div>

        {selectedGroup && (
          <div className='flex grow-[3] flex-col w-[75%]'>
            <div className='flex flex-row border-b border-gray-200 mx-6 p-1 w-[95%]'>
              <img className="h-14 w-14 rounded-full" src={selectedGroup.image} />

              <div className='self-center w-full mx-3 w-[100%] truncate'>
                <h1 className='text-3xl'>{selectedGroup.title}</h1>
                <div className='flex truncate text-xs text-gray-400'>
                  {users}
                </div>
              </div>

              <button
                type="button"
                className={`rounded-full p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2`}
              >
                <span className="sr-only">Edit Group</span>
                <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className='flex flex-col md:flex-row'>
              <VerticleDivider />
              <div className='w-[50%] px-2'>
                <div className='flex justify-between m-5'>
                  <h1 className='text-2xl'>Group Chat</h1>
                </div>

                <GroupChat groupId={selectedGroup.id} isLoading={isFetching} />
              </div>
              <VerticleDivider />
              <div className='w-[50%] px-3'>
                <div className='flex justify-between m-5'>
                  <h1 className='text-2xl'>Upcoming Events</h1>
                  <Button className='self-center bg-indigo-400' variant={'default'} onClick={() => toggleEventModal(!showEventModal)}>New Event</Button>
                </div>

                <Events groupId={selectedGroup.id} showModal={showEventModal} toggleModal={toggleEventModal} />

              </div>
            </div>
          </div>
        )}
      </div>

      <GroupModal
        display={showGroupModal}
        toggleModal={toggleGroupModal}
        refetchGroups={refetchGroups}
      />

      <Loader show={isFetching} />
    </div>
  );
}

export default GroupsPage;
