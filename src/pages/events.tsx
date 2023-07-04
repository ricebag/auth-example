import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { NextPage } from "next";

import { Button, Copyright, Events, VerticleDivider, EventModal, GroupModal, Groups, Loader } from '../components'
import { api } from "../utils/api";
import { Group } from '@prisma/client';

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
  const [showLoader, setLoader] = useState<boolean>(false)

  const [selectedId, setSelectedId] = useState<string>("")
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>()

  // const { data: events, refetch: refetchEvents } = api.events.getEventsByUserId.useQuery()
  const { data: groups, refetch: refetchGroups } = api.groups.getGroupsByUserId.useQuery()

  const editEvent = (id: string) => {
    setSelectedId(id)
  }

  const onGroupClick = (nextGroup: Group) => {
    console.log({ selectedGroup, nextGroup })
    if (selectedGroup?.id === nextGroup.id) setSelectedGroup(undefined)
    else setSelectedGroup(nextGroup)
  }

  // const refetchData = () => {
  //   refetchGroups
  //   refetchEvents
  // }

  return (
    <div className="m-20 mt-0">
      <div>
        <div className='flex'>
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

                <Events groupId={selectedGroup.id} editEvent={editEvent} />

                <EventModal
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  display={showEventModal}
                  toggleModal={toggleEventModal}
                  refetchEvents={refetchGroups}
                />

                <GroupModal
                  display={showGroupModal}
                  toggleModal={toggleGroupModal}
                  refetchEvents={refetchGroups}
                />
              </div>
            </div>
          )}

        </div>
      </div>

      <Loader show={showLoader} />

      <Copyright />
    </div>
  );
}

export default EventsPage;
