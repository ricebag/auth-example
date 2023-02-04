import type { ReactNode, FC } from 'react'

import { default as Nav } from './Nav'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  )
}

export default Layout
