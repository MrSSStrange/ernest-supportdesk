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
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Поиск по клинике, теме или описанию"
      />

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value as TicketStatus | 'all')
        }
      >
        <option value="all">Все статусы</option>
        <option value="new">Новое</option>
        <option value="in_progress">В работе</option>
        <option value="waiting_client">Ожидает клиента</option>
        <option value="resolved">Решено</option>
      </select>
    </div>
  );
}