export type Event = {
  target: {
    id: string,
    value: string
  },
  preventDefault: () => void
}