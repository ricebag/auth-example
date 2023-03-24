import { useState, } from "react"
import { FormAction, Input } from "."
import type {FormEvent, MouseEvent} from "react"

enum fields {
  name = 'name',
  description = 'description'
}

const formFields = {
  name: '',
  description: '',
}

type Props = {
  handleSubmit: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const EventForm = ({ handleSubmit }: Props) => {
  const [state, updateState] = useState(formFields)

  const handleChange = (e: FormEvent<HTMLInputElement>): void =>
    updateState({ ...state, [e.currentTarget.name]: e.currentTarget.value })

  return (
    <form>
      <Input
        key={fields.name}
        labelFor={fields.name}
        id={fields.name}
        name={fields.name}
        value={state[fields.name]}
        labelText='Name'
        placeholder="Name"
        handleChange={handleChange}
        type='text'
        isRequired={true}
      />

      <Input
        key={fields.description}
        labelFor={fields.description}
        id={fields.description}
        name={fields.description}
        value={state[fields.description]}
        labelText='Description'
        placeholder="Description"
        handleChange={handleChange}
        type='text'
        isRequired={true}
      />

      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  )
}

export default EventForm