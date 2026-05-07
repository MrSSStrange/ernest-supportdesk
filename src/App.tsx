import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router';
import './App.css';

import { initialTickets } from './data/initialTickets';
import { TicketDetailsPage } from './pages/TicketDetailsPage';
import { TicketsPage } from './pages/TicketsPage';
import type {
  NewTicketFormData,
  Ticket,
  TicketStatus,
} from './types/ticket';

const STORAGE_KEY = 'supportdesk-mini-tickets';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const savedTickets = localStorage.getItem(STORAGE_KEY);

    if (!savedTickets) {
      return initialTickets;
    }

    try {
      return JSON.parse(savedTickets) as Ticket[];
    } catch {
      return initialTickets;
    }
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  const ticketStats = useMemo(() => {
    return {
      all: tickets.length,
      new: tickets.filter((ticket) => ticket.status === 'new').length,
      in_progress: tickets.filter((ticket) => ticket.status === 'in_progress')
        .length,
      waiting_client: tickets.filter(
        (ticket) => ticket.status === 'waiting_client',
      ).length,
      resolved: tickets.filter((ticket) => ticket.status === 'resolved').length,
    };
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        ticket.clinicName.toLowerCase().includes(searchValue) ||
        ticket.title.toLowerCase().includes(searchValue) ||
        ticket.description.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === 'all' || ticket.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tickets, search, statusFilter]);

  function createTicket(ticketData: NewTicketFormData) {
    const newTicket: Ticket = {
      id: crypto.randomUUID(),
      clinicName: ticketData.clinicName,
      title: ticketData.title,
      description: ticketData.description,
      status: 'new',
      priority: ticketData.priority,
      createdAt: new Date().toLocaleDateString('ru-RU'),
    };

    setTickets((currentTickets) => [newTicket, ...currentTickets]);
  }

  function changeTicketStatus(ticketId: string, newStatus: TicketStatus) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: newStatus,
            }
          : ticket,
      ),
    );
  }

  function deleteTicket(ticketId: string) {
    setTickets((currentTickets) =>
      currentTickets.filter((ticket) => ticket.id !== ticketId),
    );
  }

  return (
    <main className="page">
      <Routes>
        <Route
          path="/"
          element={
            <TicketsPage
              tickets={tickets}
              filteredTickets={filteredTickets}
              ticketStats={ticketStats}
              search={search}
              statusFilter={statusFilter}
              onCreateTicket={createTicket}
              onChangeStatus={changeTicketStatus}
              onDelete={deleteTicket}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
            />
          }
        />

        <Route
          path="/tickets/:ticketId"
          element={<TicketDetailsPage tickets={tickets} />}
        />
      </Routes>
    </main>
  );
}

export default App;