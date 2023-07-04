import { useState, type SetStateAction } from 'react'
import { useSession } from 'next-auth/react';
import { type User } from '@prisma/client';

import { FriendsSearch, Input, Modal, } from '../components'
import { api } from "../utils/api";
import { Datepicker } from '../components';

const GroupModal = ({
    display,
    toggleModal,
    refetchEvents,
}: {
    display: boolean,
    toggleModal: (display: boolean) => void,
    refetchEvents: () => Promise<unknown>,
}) => {
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<Date>()
    const [selectedGuests, setSelectedGuests] = useState<User[]>([])
    const [description, setDescription] = useState<string>('')

    const { mutateAsync: createGroup } = api.groups.createGroup.useMutation()
    const { data: allUsers } = api.users.getAll.useQuery()

    const createNewEvent = async (id: string, allDay: boolean, guests?: User[]) => {
        const formattedGuests = guests?.filter((user) => user.id !== session?.user.id) as User[]

        await createGroup({ id, title, guests: formattedGuests })
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
        setSelectedGuests([])
    }

    return (
        <Modal
            isVisible={display}
            toggleModal={closeModal}
            onSubmit={handleSubmit}
            buttonType={'Save'}
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

export default GroupModal;
