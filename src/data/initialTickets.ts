import type { Ticket } from '../types/ticket';

export const initialTickets: Ticket[] = [
  {
    id: '1',
    clinicName: 'Клиника Здоровье',
    title: 'Не печатается чек',
    description: 'При оплате появляется ошибка фискализации.',
    status: 'new',
    priority: 'critical',
    createdAt: '2026-05-07',
  },
  {
    id: '2',
    clinicName: 'МедЦентр Плюс',
    title: 'Не приходит результат лаборатории',
    description: 'По направлению нет результата от лаборатории.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-05-07',
  },
];