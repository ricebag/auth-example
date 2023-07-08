import { useState, type SetStateAction, type Dispatch } from 'react'

import { Input, Modal, } from '../components'
import { api } from "../utils/api";
import { Datepicker } from '../components';

const EventModal = ({
    display,
    groupId,
    selectedId,
    refetchEvents,
    setSelectedId,
    toggleModal,
}: {
    display: boolean,
    groupId: string
    selectedId: string,
    refetchEvents: () => Promise<unknown>,
    setSelectedId: Dispatch<SetStateAction<string>>
    toggleModal: (display: boolean) => void,
}) => {
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<Date>()
    const [description, setDescription] = useState<string>('')

    const { mutateAsync: createEvent, } = api.events.createEvent.useMutation()
    const { mutateAsync: deleteEvent, } = api.events.deleteEvent.useMutation()

    api.events.getEventsById.useQuery(selectedId, {
        enabled: !!selectedId,
        onSettled: ((data) => {
            setTitle(data?.title ?? '')
            setDate(data?.start ?? undefined)
            setDescription(data?.title ?? '')
            toggleModal(!display)
        })
    })

    const createNewEvent = async (id: string, allDay: boolean) => {
        await createEvent({ id, title, start: new Date(date || ''), end: new Date(date || ''), allDay, groupId })
        void refetchEvents()
        setTitle('')
    }

    const handleSubmit = () => {
        void createNewEvent(`${title}-id`, false)
        void refetchEvents()
        toggleModal(!display)
    }

    const closeModal = () => {
        toggleModal(!display)
        setTitle('')
        setDate(undefined)
        setDescription('')
        setSelectedId('')
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

            <Datepicker date={date} setDate={setDate} />

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
