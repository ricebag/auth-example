import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
// import { useRouter } from 'next/router'
import type { NextPage } from "next";
import { type EventClickArg, formatDate } from 'fullcalendar'

import { Copyright, Modal, } from '../components'
import { api } from "../utils/api";
// import { useSession } from 'next-auth/react'
import { useState } from 'react'

type Selected = {
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
  allDay: boolean
}

// type SelectedDate = {
//   id: string;
//   startStr: string;
//   allDay: boolean
// }

const Calendar: NextPage = () => {
  // const router = useRouter();
  // const { data: session } = useSession();

  // if (!session) {
  //   router.push('/login')
  // }

  const [showModal, toggleModal] = useState(false)
  // const [selectedDate, setSelectedDate] = useState()

  const { data: events } = api.events.getEventsByUserId.useQuery()
  const createEvent = api.events.createEvent.useMutation()
  const deleteEvent = api.events.deleteEvent.useMutation()

  // const handleSubmit = () => {
  //   if (title) {
  //     const id = `${selected.startStr}-${title}`
  //     const start = selected.startStr
  //     const end = selected.endStr
  //     const allDay = selected.allDay

  //     calendarApi.addEvent({ id, title, start, end, allDay })
  //     createEvent.mutate({ id, title, start: new Date(start), end: new Date(end), allDay })
  //   }
  // }

  const handDateClick = (selected: Selected) => {
    toggleModal(!showModal)
    const title = prompt('Please enter a new title for your event') as string
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();


    if (title) {
      const id = `${selected.startStr}-${title}`
      const start = selected.startStr
      const end = selected.endStr
      const allDay = selected.allDay

      calendarApi.addEvent({ id, title, start, end, allDay })
      createEvent.mutate({ id, title, start: new Date(start), end: new Date(end), allDay })
    }
  }

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(`Are you sur eyou want to delete the event ${selected.event.title}`)
    ) {
      // TODO: refresh the Calendar with the latest data
      deleteEvent.mutate({ id: selected.event.id })
    }
  }

  const Events = events?.map(event => (
    <div key={event.id} className="m-1 p-1 rounded-sm bg-white">
      <h1 >{event.title}</h1>
      <p>{`${formatDate(event.start, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}`}</p>
    </div>
  ))

  return (
    <div className="m-20 mt-0">
      <h1 className='text-6xl'>Calendar</h1>
      <h2 className='text-4xl'>Full Calendar Interactive Page</h2>

      <div className="mt-4 flex justify-between">
        {/* Sidebar */}

        <div className="grow shrink basis-1/5 bg-teal-300 p-4 rounded">
          <h1 className='text-xt'>Events</h1>
          {Events}
        </div>

        <div className="grow shrink basis-full bg-teal-300 p-8 rounded ml-2">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handDateClick}
            eventClick={handleEventClick}
            // eventsSet={(events) => setCurrentEvents(events)}
            events={events}
          />
        </div>
      </div>


      <Modal isVisible={showModal} onClose={() => toggleModal(!showModal)} />
      <Copyright />
    </div>
  );
}

export default Calendar;
