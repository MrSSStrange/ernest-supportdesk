import { TicketCard } from '../components/TicketCard';
import { TicketFilters } from '../components/TicketFilters';
import { TicketForm } from '../components/TicketForm';
import { statusLabels } from '../constants/ticket';
import type {
  NewTicketFormData,
  Ticket,
  TicketStatus,
} from '../types/ticket';

type TicketsPageProps = {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  ticketStats: {
    all: number;
    new: number;
    in_progress: number;
    waiting_client: number;
    resolved: number;
  };
  search: string;
  statusFilter: TicketStatus | 'all';
  onCreateTicket: (ticketData: NewTicketFormData) => void;
  onChangeStatus: (ticketId: string, newStatus: TicketStatus) => void;
  onDelete: (ticketId: string) => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: TicketStatus | 'all') => void;
};

export function TicketsPage({
  tickets,
  filteredTickets,
  ticketStats,
  search,
  statusFilter,
  onCreateTicket,
  onChangeStatus,
  onDelete,
  onSearchChange,
  onStatusFilterChange,
}: TicketsPageProps) {
  return (
    <>
      <section className="hero">
        <div>
          <h1>Ernest SupportDesk Mini</h1>
          <p className="heroText">
            Портфолио-проект на React для обработки клиентских обращений.
          </p>
        </div>

        <div className="stats">
          <span>{tickets.length}</span>
          <p>обращений всего</p>
        </div>
      </section>

      <section className="layout">
        <TicketForm onCreateTicket={onCreateTicket} />

        <section className="tickets">
          <div className="statGrid">
            <div className="statCard">
              <span>{ticketStats.all}</span>
              <p>Всего</p>
            </div>

            <div className="statCard">
              <span>{ticketStats.new}</span>
              <p>{statusLabels.new}</p>
            </div>

            <div className="statCard">
              <span>{ticketStats.in_progress}</span>
              <p>{statusLabels.in_progress}</p>
            </div>

            <div className="statCard">
              <span>{ticketStats.waiting_client}</span>
              <p>{statusLabels.waiting_client}</p>
            </div>

            <div className="statCard">
              <span>{ticketStats.resolved}</span>
              <p>{statusLabels.resolved}</p>
            </div>
          </div>

          <TicketFilters
            search={search}
            statusFilter={statusFilter}
            onSearchChange={onSearchChange}
            onStatusFilterChange={onStatusFilterChange}
          />

          <div className="ticketList">
            {filteredTickets.length === 0 ? (
              <div className="empty">Обращения не найдены</div>
            ) : (
              filteredTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onChangeStatus={onChangeStatus}
                  onDelete={onDelete}
                />
              ))
            )}
          </div>
        </section>
      </section>
    </>
  );
}