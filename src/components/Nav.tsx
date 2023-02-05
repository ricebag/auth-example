import Link from "next/link"
import { signOut, useSession } from "next-auth/react";

// import { api } from "../utils/api";

const Nav = () => {
  const { data: session } = useSession();

  const Buttons = !!session ? (
    <button
      className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9"
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  ) : (
    <Link href={'/login'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">
      Login
    </Link>
  )

  return (
    <nav className="flex justify-between item-centre py-10">
      <Link href={'/'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">Logo</Link>
      {Buttons}
    </nav>
  )
}

export default Nav
