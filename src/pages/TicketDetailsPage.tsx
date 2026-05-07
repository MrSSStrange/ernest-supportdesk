import { Link, useParams } from 'react-router';
import { priorityLabels, statusLabels } from '../constants/ticket';
import type { Ticket } from '../types/ticket';

type TicketDetailsPageProps = {
  tickets: Ticket[];
};

export function TicketDetailsPage({ tickets }: TicketDetailsPageProps) {
  const { ticketId } = useParams();

  const ticket = tickets.find((currentTicket) => currentTicket.id === ticketId);

  if (!ticket) {
    return (
      <section className="detailsPage">
        <Link className="backLink" to="/">
          ← Назад к обращениям
        </Link>

        <div className="card detailsCard">
          <h1>Обращение не найдено</h1>
          <p>Возможно, оно было удалено.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="detailsPage">
      <Link className="backLink" to="/">
        ← Назад к обращениям
      </Link>

      <article className="card detailsCard">
        <div className="detailsHeader">
          <div>
            <p className="eyebrow">Обращение #{ticket.id.slice(0, 8)}</p>
            <h1>{ticket.title}</h1>
            <p>{ticket.clinicName}</p>
          </div>

          <span className={`priority ${ticket.priority}`}>
            {priorityLabels[ticket.priority]}
          </span>
        </div>

        <div className="detailsGrid">
          <div>
            <span>Статус</span>
            <strong>{statusLabels[ticket.status]}</strong>
          </div>

          <div>
            <span>Дата создания</span>
            <strong>{ticket.createdAt}</strong>
          </div>

          <div>
            <span>Приоритет</span>
            <strong>{priorityLabels[ticket.priority]}</strong>
          </div>
        </div>

        <div className="detailsDescription">
          <h2>Описание проблемы</h2>
          <p>{ticket.description}</p>
        </div>
      </article>
    </section>
  );
}