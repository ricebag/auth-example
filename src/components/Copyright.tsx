import type { FC, } from 'react'
import Link from "next/link";

const Copyright: FC = () => (
  <div className='py-10 mt-auto flex flex-col items-center bottom-0 bg-grey'>
    <p>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  </div>
);

export default Copyright
