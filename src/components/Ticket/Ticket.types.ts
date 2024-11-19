import { DraggableStateSnapshot } from '@hello-pangea/dnd'

export type TTicketCard = {
  id: string
  title: string
}

export type TTicketCardProps = TTicketCard & {
  snapshot: DraggableStateSnapshot
  handleDoubleClickEvent: (event: React.MouseEvent<HTMLElement>, id: string) => void
  handleDeleteTicket: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void
}
