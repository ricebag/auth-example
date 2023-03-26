import { useState, useEffect, type SetStateAction, type MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import type { NextPage } from "next";

import { Copyright, Input, Modal, } from '../components'
import { default as CalendarComp } from '../components/Calendar'
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

// type SelectedDate = {
//   id: string;
//   startStr: string;
//   allDay: boolean
// }

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
  const [userSelected, updateSelected] = useState<Selected | null>()
  const [title, updateTitle] = useState<string>('')
  // const [selectedDate, setSelectedDate] = useState()

  const { data: events, refetch: refetchEvents } = api.events.getEventsByUserId.useQuery()
  // const { data: friends, refetch: refetchUsers } = api.users.getFriends.useQuery()
  const { mutateAsync: createEvent } = api.events.createEvent.useMutation()
  const { mutateAsync: deleteEvent } = api.events.deleteEvent.useMutation()

  const createNewEvent = async (id: string, start: string, end: string, allDay: boolean) => {
    console.log({ id, title, start, end, allDay })
    await createEvent({ id, title, start: new Date(start), end: new Date(end), allDay })
    void refetchEvents()
  }

  const handleSubmit = () => {
    if (title && userSelected) {
      const id = `${userSelected.startStr}-${title}`
      const start = userSelected.startStr
      const end = userSelected.endStr
      const allDay = userSelected.allDay

      void createNewEvent(id, start, end, allDay)
    }
  }

  const changeModal = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    // console.log({ target: event.target.dateTime })
    // updateSelected(event.target.id)
    toggleModal(!showModal)
  }

  const removeEvent = async (id: string) => {
    if (userSelected) {
      await deleteEvent({ id })
      void refetchEvents()
    }
  }

  const handleEventClick = (id: string) => {
    console.log('delete', id)
    void removeEvent(id)
  }

  return (
    <div className="m-20 mt-0">
      <h1 className='text-6xl'>Calendar</h1>
      <h2 className='text-4xl'>Full Calendar Interactive Page</h2>

      <div className="mt-4 flex justify-between">
        <div className="grow shrink basis-full bg-teal-300 p-8 rounded ml-2">
          <CalendarComp events={events} onEventClick={handleEventClick} toggleModal={changeModal} />
        </div>
      </div>

      <Modal isVisible={showModal} toggleModal={() => toggleModal(!showModal)} onSubmit={handleSubmit} buttonType={'Save'}>
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

        <div className="flex -space-x-1 overflow-hidden">
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </div>

      </Modal>
      <Copyright />
    </div>
  );
}

export default Calendar;
