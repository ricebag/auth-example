import Link from "next/link"
import Image from "next/image"

type HeaderTypes = {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

const LoginFormHeader = ({
  heading,
  paragraph,
  linkName,
  linkUrl = "#"
}: HeaderTypes) => (
  <div className="mt-10 mb-5">
    <div className="flex justify-center">
      <Image
        alt=""
        width='100'
        height='100'
        src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315" />
    </div>
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      {heading}
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600 mt-5">
      {paragraph} {' '}
      <Link href={linkUrl} className="font-medium text-purple-600 hover:text-purple-500">
        {linkName}
      </Link>
    </p>
  </div>
)

export default LoginFormHeader
