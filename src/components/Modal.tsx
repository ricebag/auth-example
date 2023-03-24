import type { MouseEvent } from "react"
import EventForm from "./EventForm"

type Props = {
  isVisible: boolean;
  onClose: () => void;
}

const Modal = ({ isVisible, onClose }: Props) => {
  if (!isVisible) return <></>

  const handleClose = (e: MouseEvent<HTMLButtonElement & HTMLDivElement>) => {
    if (e.currentTarget.id === 'wrapper') onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={handleClose}>X</button>
        <div className="bg-white p2 rounded">
          <EventForm handleSubmit={(e) => console.log(e.currentTarget.value)} />
        </div>
      </div>
    </div>
  )
}

export default Modal