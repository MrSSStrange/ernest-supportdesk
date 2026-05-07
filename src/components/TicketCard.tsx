import { Link } from 'react-router';
import { priorityLabels, statusLabels } from '../constants/ticket';
import type { Ticket, TicketStatus } from '../types/ticket';

type TicketCardProps = {
  ticket: Ticket;
  onChangeStatus: (ticketId: string, newStatus: TicketStatus) => void;
  onDelete: (ticketId: string) => void;
};

export function TicketCard({
  ticket,
  onChangeStatus,
  onDelete,
}: TicketCardProps) {
  return (
    <article className="card ticket">
      <div className="ticketHeader">
        <div>
          <h3>{ticket.title}</h3>
          <p>{ticket.clinicName}</p>
        </div>

        <span className={`priority ${ticket.priority}`}>
          {priorityLabels[ticket.priority]}
        </span>
      </div>

      <p className="description">{ticket.description}</p>

      <div className="ticketFooter">
        <select
          value={ticket.status}
          onChange={(event) =>
            onChangeStatus(ticket.id, event.target.value as TicketStatus)
          }
        >
          <option value="new">Новое</option>
          <option value="in_progress">В работе</option>
          <option value="waiting_client">Ожидает клиента</option>
          <option value="resolved">Решено</option>
        </select>

        <span className="status">{statusLabels[ticket.status]}</span>

        <Link className="detailsButton" to={`/tickets/${ticket.id}`}>
          Подробнее
        </Link>

        <button
          className="deleteButton"
          type="button"
          onClick={() => onDelete(ticket.id)}
        >
          Удалить
        </button>
      </div>
    </article>
  );
}