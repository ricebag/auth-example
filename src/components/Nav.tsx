import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

export default function Nav() {
  const { data: session } = useSession();

  // if (!session) {
  //   // Handle unauthenticated state, e.g. render a SignIn component
  //   return <SignIn />;
  // }

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: session?.user !== undefined },
  );

  console.log({ session })

  const Buttons = session ? (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  ) : (
    // <ul>
    //   <Link href={'/signup'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium ml-9">
    //     Join Now
    //   </Link>

      <Link href={'/login'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">
        Login
      </Link>
    // </ul>
  )


  return (
    <nav className="flex justify-between item-centre py-10">
      <Link href={'/'} className="py-2 px-4 text-lg bg-teal-500 text-white rounded-lg font-medium mx-9">Logo</Link>
      {Buttons}
    </nav>
  )
}