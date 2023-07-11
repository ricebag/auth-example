import { useState, type KeyboardEvent } from "react";
import { useSession } from "next-auth/react";

import { api } from "../utils/api"
import { Prisma } from "@prisma/client";

type GroupChatComponentTypes = {
    groupId: string,
    isLoading: boolean,
}

const MessageWithUser = Prisma.validator<Prisma.MessageArgs>()({
    include: {
        User: true
    },
})
export type Message = Prisma.MessageGetPayload<typeof MessageWithUser>

const userMessage = (message: Message, previousDiffAuthor: boolean, marginTop: string) => (
    <div className="flex self-end" key={message.id}>
        <p className={`bg-indigo-300 max-w-[80%] grow-0 py-1 px-2 m-2 mr-9 rounded-lg rounded-tr-none ${marginTop}`}>
            {message.message}
        </p>
    </div>
)

const systemMessage = (message: Message) => (
    <div className="flex self-center" key={message.id}>
        <p className="bg-slate-200 max-w-[80%] grow-0 py-1 px-2 m-2 rounded-lg text-center">
            {message.message}
        </p>
    </div>
)

const groupMemberMessage = (message: Message, previousDiffAuthor: boolean, marginTop: string) => (
    <div className="flex self-start" key={message.id}>
        {previousDiffAuthor &&
            <div className="-mr-8 pt-2">
                {/* TODO: Once users are linked take their image and put it here */}
                <img className="h-8 w-8 rounded-full" src={message.User?.image ? message.User.image : '/avatar.svg'} alt="" />
            </div>
        }

        <div>
            <p
                className={`bg-blue-400 max-w-[80%] grow-0 py-1 px-2 m-2 ml-9 rounded-lg rounded-tl-none ${marginTop}`}
            >{message.message}</p>
        </div>

    </div>
)

export default function GroupChat({ groupId, isLoading }: GroupChatComponentTypes) {
    const { data: session } = useSession();
    const [userInput, setUserInput] = useState('')
    const { data: messages, refetch: refetchMessages } = api.messages.getMessagesByGroupId.useQuery(groupId)
    const { mutateAsync: createMessage } = api.messages.createMessage.useMutation()

    const Messages = messages?.map((message, key) => {
        const isPreviousDiffAuthor = messages[key - 1]?.author !== message.author
        const marginTop = isPreviousDiffAuthor ? '' : '-mt-1'

        if (message.author === session?.user.id) return userMessage(message, isPreviousDiffAuthor, marginTop)
        if (message.author === 'system') return systemMessage(message)

        // otherwise assume the message is from another group member
        else return groupMemberMessage(message, isPreviousDiffAuthor, marginTop)
    })

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            await createMessage({ message: userInput, groupId })
            setUserInput('')
            void refetchMessages()
        }
    }

    return (
        <div className="flex flex-col grow">
            {Messages}

            <div className="my-5">
                <label htmlFor={userInput} className="sr-only">Type your message...</label>
                <input
                    disabled={isLoading}
                    onChange={(e) => setUserInput(e.currentTarget.value)}
                    onKeyDown={(e) => void handleKeyDown(e)}
                    value={userInput}
                    id={userInput}
                    name={userInput}
                    type='text'
                    className="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                    placeholder='Type your message...'
                />
            </div>
        </div>
    )
}