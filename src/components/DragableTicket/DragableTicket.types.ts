export type TDraggableTicketProps = {
  ticket: { id: string; title: string }
  index: number
  handleDoubleClickEvent: (event: React.MouseEvent<HTMLElement>, id: string) => void
  handleDeleteTicket: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void
}
