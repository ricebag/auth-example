import { useState, type SetStateAction, type Dispatch } from 'react'
import { useSession } from 'next-auth/react';
import { type User } from '@prisma/client';

import { FriendsSearch, Input, Modal, } from '../components'
import { api } from "../utils/api";
import { TimePicker } from '../components';

const EventModal = ({
    selectedId,
    setSelectedId,
    display,
    toggleModal,
    refetchEvents,
}: {
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
    display: boolean,
    toggleModal: (display: boolean) => void,
    refetchEvents: () => Promise<unknown>,
}) => {
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<Date>()
    const [selectedGuests, setSelectedGuests] = useState<User[]>([])
    const [description, setDescription] = useState<string>('')

    const { mutateAsync: createEvent } = api.events.createEvent.useMutation()
    const { data: allUsers } = api.users.getAll.useQuery()
    const { mutateAsync: deleteEvent } = api.events.deleteEvent.useMutation()

    api.events.getEventsById.useQuery(selectedId, {
        enabled: !!selectedId,
        onSettled: ((data) => {
            console.log(data)
            setTitle(data?.title ?? '')
            setDate(data?.start ?? undefined)
            setDescription(data?.title ?? '')
            setSelectedGuests(data?.peopleEvents?.map(peopleEvent => peopleEvent.user) || [])
            toggleModal(!display)
        })
    })

    const createNewEvent = async (id: string, allDay: boolean, guests?: User[]) => {
        const formattedGuests = guests?.filter((user) => user.id !== session?.user.id) as User[]

        await createEvent({ id, title, start: new Date(date || ''), end: new Date(date || ''), allDay, guests: formattedGuests })
        void refetchEvents()
        setTitle('')
    }

    const handleSubmit = () => {
        void createNewEvent(`${title}-id`, false, selectedGuests)
        void refetchEvents()
        toggleModal(!display)
    }

    const closeModal = () => {
        toggleModal(!display)
        setTitle('')
        setDate(undefined)
        setDescription('')
        setSelectedId('')
        setSelectedGuests([])
    }

    const onDelete = async () => {
        // set loading as true

        toggleModal(!display)
        await deleteEvent({ id: selectedId })
        await refetchEvents()

        // set loading as false
    }

    return (
        <Modal
            isVisible={display}
            toggleModal={closeModal}
            onSubmit={handleSubmit}
            buttonType={'Save'}
            onDelete={selectedId ? onDelete : undefined}
        >
            <Input
                key={'title'}
                labelFor={'title'}
                id={'title'}
                name={'title'}
                value={title}
                labelText='Title'
                placeholder="Add Title"
                handleChange={(e: { currentTarget: { value: SetStateAction<string> } }) => setTitle(e.currentTarget.value)}
                type='text'
                isRequired={true}
            />

            <FriendsSearch friends={allUsers} selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />

            <TimePicker date={date} setDate={setDate} />

            <Input
                key={'description'}
                labelFor={'description'}
                id={'description'}
                name={'description'}
                value={description}
                labelText='Description'
                placeholder="Add Description"
                handleChange={(e: { currentTarget: { value: SetStateAction<string> } }) => setDescription(e.currentTarget.value)}
                type='text'
                isRequired={true}
            />
        </Modal>
    );
}

export default EventModal;
