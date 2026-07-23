import { SupportSidebar } from '../components/SupportSidebar';
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

const queueFilters = ['all', 'new', 'in_progress', 'waiting_client', 'resolved'] as const;

export function TicketsPage({
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
    <div className="deskShell">
      <SupportSidebar
        newCount={ticketStats.new}
        inProgressCount={ticketStats.in_progress}
      />

      <section className="deskMain">
        <header className="deskHeader">
          <div>
            <p className="breadcrumbs">Поддержка / Очередь</p>
            <h1>Входящие обращения</h1>
            <p className="deskSubtitle">
              Четверг, 23 июля · дежурная смена 09:00–18:00
            </p>
          </div>
          <span className="connectionState">
            <i aria-hidden="true" /> Система работает
          </span>
        </header>

        <nav className="queueTabs" aria-label="Фильтр по статусу">
          {queueFilters.map((status) => (
            <button
              className={statusFilter === status ? 'isActive' : ''}
              key={status}
              type="button"
              onClick={() => onStatusFilterChange(status)}
            >
              {status === 'all' ? 'Все' : statusLabels[status]}
              <span>{ticketStats[status]}</span>
            </button>
          ))}
        </nav>

        <div className="queueLayout">
          <section className="queuePanel">
            <TicketFilters
              search={search}
              statusFilter={statusFilter}
              onSearchChange={onSearchChange}
              onStatusFilterChange={onStatusFilterChange}
            />

            <div className="queueMeta">
              <span>
                Найдено: <strong>{filteredTickets.length}</strong>
              </span>
              <span>Сначала срочные</span>
            </div>

            <div className="ticketList">
              {filteredTickets.length === 0 ? (
                <div className="empty">
                  <strong>В этой очереди пусто</strong>
                  <span>Измените фильтр или поисковый запрос.</span>
                </div>
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

          <aside className="queueAside">
            <TicketForm onCreateTicket={onCreateTicket} />

            <section className="shiftCard">
              <div className="shiftCardHeading">
                <span>Смена сегодня</span>
                <strong>до 18:00</strong>
              </div>
              <dl>
                <div>
                  <dt>В очереди</dt>
                  <dd>{ticketStats.new + ticketStats.in_progress}</dd>
                </div>
                <div>
                  <dt>Ждём клиента</dt>
                  <dd>{ticketStats.waiting_client}</dd>
                </div>
                <div>
                  <dt>Закрыто</dt>
                  <dd>{ticketStats.resolved}</dd>
                </div>
              </dl>
              <p>Следующая передача смены — в 17:45.</p>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
