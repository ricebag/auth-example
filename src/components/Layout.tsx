import { default as Nav } from './Nav'

export default function Layout({ children }: { children: any }) {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  )
}