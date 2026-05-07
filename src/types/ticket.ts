export type TicketStatus =
  | 'new'
  | 'in_progress'
  | 'waiting_client'
  | 'resolved';

export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type Ticket = {
  id: string;
  clinicName: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
};

export type NewTicketFormData = {
  clinicName: string;
  title: string;
  description: string;
  priority: TicketPriority;
};