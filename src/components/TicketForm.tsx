import { useState, type FormEvent } from 'react';
import type { NewTicketFormData, TicketPriority } from '../types/ticket';

type TicketFormProps = {
  onCreateTicket: (ticketData: NewTicketFormData) => void;
};

export function TicketForm({ onCreateTicket }: TicketFormProps) {
  const [clinicName, setClinicName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('medium');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!clinicName.trim() || !title.trim() || !description.trim()) {
      return;
    }

    onCreateTicket({
      clinicName,
      title,
      description,
      priority,
    });

    setClinicName('');
    setTitle('');
    setDescription('');
    setPriority('medium');
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Новое обращение</h2>

      <label>
        Клиника
        <input
          value={clinicName}
          onChange={(event) => setClinicName(event.target.value)}
          placeholder="Например: Клиника Здоровье"
        />
      </label>

      <label>
        Тема
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Например: Не печатается чек"
        />
      </label>

      <label>
        Описание
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Опиши проблему клиента"
          rows={5}
        />
      </label>

      <label>
        Приоритет
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as TicketPriority)
          }
        >
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
          <option value="critical">Критичный</option>
        </select>
      </label>

      <button type="submit">Создать обращение</button>
    </form>
  );
}