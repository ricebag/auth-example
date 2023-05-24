import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { NextPage } from "next";

import { Button, Copyright, Events } from '../components'
import { api } from "../utils/api";
import EventModal from '../components/EventModal';

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

const Calendar: NextPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();

  useEffect(() => {
    if (!session && status !== 'loading') {
      void router.push('/login')
    }
    // if session.expired > date.now() sign the user out
  });

  const [showModal, toggleModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState("")

  const { data: events, refetch: refetchEvents } = api.events.getEventsByUserId.useQuery()

  const editEvent = (id: string) => {
    setSelectedId(id)
  }

  return (
    <div >
      <div className="m-20 mt-0">
        <div className='flex justify-between'>
          <h1 className='text-6xl'>Events</h1>
          <Button className='self-center bg-indigo-400' variant={'default'} onClick={() => toggleModal(!showModal)}>New Event</Button>
        </div>

        <Events events={events} editEvent={editEvent} />

        <EventModal
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          display={showModal}
          toggleModal={toggleModal}
          refetchEvents={refetchEvents} />

      </div>
      <Copyright />
    </div>
  );
}

export default Calendar;
