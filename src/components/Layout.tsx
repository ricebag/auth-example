import type { ReactNode, FC } from 'react'

import { default as Nav } from './Nav'
import Copyright from './Copyright'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Nav />
      <main className='grow'>{children}</main>
      <Copyright />
    </div>
  )
}

export default Layout
