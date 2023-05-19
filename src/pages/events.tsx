import { useState, useEffect, type SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { NextPage } from "next";

import { Copyright, FriendsSearch, Input, Modal, Events } from '../components'
import { api } from "../utils/api";
import { type User } from '@prisma/client';
// import TimePicker from '../components/TimePicker';
import { TimePicker } from '../components';

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

  const [showModal, toggleModal] = useState<boolean>(true)
  const [title, updateTitle] = useState<string>('')
  const [date, setDate] = useState<Date>()
  const [selectedGuests, setSelectedGuests] = useState<User[]>([])
  const [description, updateDescription] = useState<string>('')

  const { data: events, refetch: refetchEvents } = api.events.getEventsByUserId.useQuery()
  const { data: friends, refetch: refetchFriends } = api.users.getFriends.useQuery()
  const { data: allUsers, refetch: refetchUsers } = api.users.getAll.useQuery()
  const { mutateAsync: createEvent } = api.events.createEvent.useMutation()
  const { mutateAsync: deleteEvent } = api.events.deleteEvent.useMutation()

  const createNewEvent = async (id: string, allDay: boolean, guests?: User[]) => {
    const formattedGuests = guests?.filter((user) => user.id !== session?.user.id) as User[]

    await createEvent({ id, title, start: new Date(date || ''), end: new Date(date || ''), allDay, guests: formattedGuests })
    void refetchEvents()
    updateTitle('')
  }

  const handleSubmit = () => {
    // if (title && userSelected) {
    //   const id = `${userSelected.startStr}-${title}`
    //   const start = userSelected.startStr
    //   const end = userSelected.endStr
    //   const allDay = userSelected.allDay

    // void createNewEvent(id, start, end, allDay)
    // }

    void createNewEvent(`${title}-id`, false, selectedGuests)
    void refetchEvents()
    toggleModal(!showModal)
  }

  return (
    <div >
      <div className="m-20 mt-0">
        <h1 className='text-6xl'>Events</h1>
        <button onClick={() => toggleModal(!showModal)}>New Event</button>


        <Events events={events} />


        {/* <div className="mt-4 flex justify-between">
        <div className="grow shrink basis-full bg-teal-300 p-8 rounded ml-2">
          <CalendarComp events={events} onEventClick={handleEventClick} toggleModal={changeModal} />
        </div>
      </div> */}

        <Modal
          isVisible={showModal}
          toggleModal={() => toggleModal(!showModal)}
          onSubmit={handleSubmit}
          buttonType={'Save'}>
          <Input
            key={'title'}
            labelFor={'title'}
            id={'title'}
            name={'title'}
            value={title}
            labelText='Title'
            placeholder="Add Title"
            handleChange={(e: { currentTarget: { value: SetStateAction<string> } }) => updateTitle(e.currentTarget.value)}
            type='text'
            isRequired={true}
          />

          <FriendsSearch friends={allUsers} selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />

          <>
            <TimePicker date={date} setDate={setDate} />
          </>
        </Modal>
      </div>
      <Copyright />
    </div>
  );
}

export default Calendar;
