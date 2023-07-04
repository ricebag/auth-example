import type { Group } from '@prisma/client';
import type { NextPage } from "next";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { Button, Events, VerticleDivider, GroupModal, Groups, Loader } from '../components'
import { api } from "../utils/api";

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

const EventsPage: NextPage = () => {
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

  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>()

  const { data: groups, refetch: refetchGroups, isLoading } = api.groups.getGroupsByUserId.useQuery()


  const onGroupClick = (nextGroup: Group) => {
    if (selectedGroup?.id === nextGroup.id) setSelectedGroup(undefined)
    else setSelectedGroup(nextGroup)
  }

  return (
    <div className='grow'>
      <div className='flex grow'>
        <div className='grow px-3'>
          <div className='flex justify-between m-5'>
            <h1 className='text-5xl'>Groups</h1>
            <Button className='self-center bg-indigo-400' variant={'default'} onClick={() => toggleGroupModal(!showGroupModal)}>New Group</Button>
          </div>
          <Groups groups={groups} onGroupClick={onGroupClick} />
        </div>

        {selectedGroup && (
          <div className='flex grow-[3]'>
            <VerticleDivider />
            <div className='grow px-3'>
              <div className='flex justify-between m-5'>
                <h1 className='text-5xl'>{selectedGroup.title}</h1>
                <Button className='self-center bg-indigo-400' variant={'default'} onClick={() => toggleEventModal(!showEventModal)}>New Event</Button>
              </div>

              <Events groupId={selectedGroup.id} showModal={showEventModal} toggleModal={toggleEventModal} />

              <GroupModal
                display={showGroupModal}
                toggleModal={toggleGroupModal}
                refetchGroups={refetchGroups}
              />
            </div>
          </div>
        )}
      </div>

      <Loader show={isLoading} />
    </div>
  );
}

export default EventsPage;
