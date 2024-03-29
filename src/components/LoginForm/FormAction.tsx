import type { MouseEvent } from "react";

type FormActionProps = {
  handleSubmit: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
  action?: string;
  text: string;
}

const FormAction = ({
  handleSubmit,
  text
}: FormActionProps) => (
  <>
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
      onClick={(e)=> handleSubmit(e)}
    >
      {text}
    </button>
  </>
)

export default FormAction
