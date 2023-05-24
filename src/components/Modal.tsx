import { Fragment, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import { Dialog, Transition, } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

enum ButtonTypes {
    'Save',
    'Deactivate'
}

type Props = {
    isVisible: boolean;
    toggleModal: () => void;
    buttonType?: keyof typeof ButtonTypes;
    onSubmit: () => void;
    onDelete?: () => void;
}

export default function Modal({ isVisible, toggleModal, children, buttonType, onSubmit, onDelete }: PropsWithChildren<Props>) {
    const cancelButtonRef = useRef(null)

    const DeleteButton = onDelete ? (
        <button
            type="button"
            className="inline-flex w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
            onClick={onDelete}
        >
            Delete
        </button>
    ) : (<></>)

    const Button = !buttonType ? (
        <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={toggleModal}
        >
            Deactivate
        </button>
    ) : (
        <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 sm:ml-3 sm:w-auto"
            onClick={onSubmit}
        >
            Save
        </button>
    )

    return (
        <Transition.Root show={isVisible} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={toggleModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4 sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-auto sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={toggleModal}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {children}
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-between">
                                    <div className='sm:flex sm:flex-row-reverse'>
                                        {Button}
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={toggleModal}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                    {DeleteButton}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
