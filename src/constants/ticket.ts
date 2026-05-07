import type { TicketPriority, TicketStatus } from '../types/ticket';

export const statusLabels: Record<TicketStatus, string> = {
  new: 'Новое',
  in_progress: 'В работе',
  waiting_client: 'Ожидает клиента',
  resolved: 'Решено',
};

export const priorityLabels: Record<TicketPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
  critical: 'Критичный',
};