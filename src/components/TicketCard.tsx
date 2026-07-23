import { Link } from 'react-router';
import { priorityLabels } from '../constants/ticket';
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
  const shortId = ticket.id.startsWith('SD-')
    ? ticket.id
    : `SD-${ticket.id.slice(0, 4).toUpperCase()}`;

  function handleDelete() {
    if (window.confirm(`Удалить обращение ${shortId}?`)) {
      onDelete(ticket.id);
    }
  }

  return (
    <article className={`ticket priority-${ticket.priority}`}>
      <div className="ticketLead">
        <span className={`priorityMark ${ticket.priority}`} aria-hidden="true" />
        <div>
          <div className="ticketIdentity">
            <span>{shortId}</span>
            <span>{ticket.channel}</span>
            <span>{ticket.createdAt}</span>
          </div>
          <Link className="ticketTitle" to={`/tickets/${ticket.id}`}>
            {ticket.title}
          </Link>
          <p className="ticketClinic">{ticket.clinicName}</p>
          <p className="description">{ticket.description}</p>
        </div>
      </div>

      <div className="ticketOwner">
        <span className="ownerAvatar">
          {ticket.assignee === 'Не назначен'
            ? '—'
            : ticket.assignee
                .split(' ')
                .map((part) => part[0])
                .join('')
                .slice(0, 2)}
        </span>
        <span>
          <small>Исполнитель</small>
          <strong>{ticket.assignee}</strong>
        </span>
      </div>

      <div className="ticketSla">
        <small>SLA</small>
        <strong>{ticket.sla}</strong>
        <span>{priorityLabels[ticket.priority]}</span>
      </div>

      <div className="ticketActions">
        <select
          className={`statusControl ${ticket.status}`}
          value={ticket.status}
          aria-label={`Статус обращения ${shortId}`}
          onChange={(event) =>
            onChangeStatus(ticket.id, event.target.value as TicketStatus)
          }
        >
          <option value="new">Новое</option>
          <option value="in_progress">В работе</option>
          <option value="waiting_client">Ждём клиента</option>
          <option value="resolved">Решено</option>
        </select>

        <button
          className="deleteButton"
          type="button"
          aria-label={`Удалить обращение ${shortId}`}
          title="Удалить"
          onClick={handleDelete}
        >
          ×
        </button>
      </div>
    </article>
  );
}
