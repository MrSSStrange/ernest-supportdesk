import type { TicketStatus } from '../types/ticket';

type TicketFiltersProps = {
  search: string;
  statusFilter: TicketStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: TicketStatus | 'all') => void;
};

export function TicketFilters({
  search,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}: TicketFiltersProps) {
  return (
    <div className="toolbar">
      <label className="ticketSearch">
        <span aria-hidden="true">⌕</span>
        <span className="visuallyHidden">Поиск обращений</span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Номер, организация или текст обращения"
        />
      </label>

      <select
        className="mobileStatusFilter"
        value={statusFilter}
        aria-label="Фильтр по статусу"
        onChange={(event) =>
          onStatusFilterChange(event.target.value as TicketStatus | 'all')
        }
      >
        <option value="all">Все статусы</option>
        <option value="new">Новое</option>
        <option value="in_progress">В работе</option>
        <option value="waiting_client">Ждём клиента</option>
        <option value="resolved">Решено</option>
      </select>

      <button className="filterButton" type="button">
        Фильтры <span>0</span>
      </button>
    </div>
  );
}
