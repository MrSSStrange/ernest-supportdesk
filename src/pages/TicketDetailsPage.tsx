import { Link, useParams } from 'react-router';
import { SupportSidebar } from '../components/SupportSidebar';
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
      <div className="deskShell">
        <SupportSidebar />
        <section className="deskMain detailsPage">
          <Link className="backLink" to="/">← Вернуться в очередь</Link>
          <div className="detailsCard missingTicket">
            <span>404</span>
            <h1>Обращение не найдено</h1>
            <p>Возможно, его уже удалили или ссылка устарела.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="deskShell">
      <SupportSidebar />
      <section className="deskMain detailsPage">
        <div className="detailsToolbar">
          <Link className="backLink" to="/">← Вернуться в очередь</Link>
          <span>Последнее изменение: сегодня, 10:24</span>
        </div>

        <header className="detailsHeader">
          <div>
            <div className="ticketIdentity">
              <span>{ticket.id}</span>
              <span>{ticket.channel}</span>
              <span>{ticket.createdAt}</span>
            </div>
            <h1>{ticket.title}</h1>
            <p>{ticket.clinicName}</p>
          </div>
          <span className={`detailsPriority ${ticket.priority}`}>
            {priorityLabels[ticket.priority]} приоритет
          </span>
        </header>

        <div className="detailsLayout">
          <article className="detailsCard">
            <section className="requestBlock">
              <h2>Описание от клиента</h2>
              <p>{ticket.description}</p>
            </section>

            <section className="timeline">
              <h2>История</h2>
              <div className="timelineItem">
                <span className="timelineAvatar">С</span>
                <div>
                  <p><strong>Система</strong> создала обращение из канала «{ticket.channel}»</p>
                  <small>{ticket.createdAt}</small>
                </div>
              </div>
              {ticket.assignee !== 'Не назначен' && (
                <div className="timelineItem">
                  <span className="timelineAvatar person">ЭМ</span>
                  <div>
                    <p><strong>{ticket.assignee}</strong> взял обращение в работу</p>
                    <small>сегодня, 09:36</small>
                  </div>
                </div>
              )}
            </section>

            <form className="replyBox">
              <label htmlFor="reply">Внутренняя заметка</label>
              <textarea
                id="reply"
                rows={4}
                placeholder="Оставьте комментарий для следующего специалиста…"
              />
              <div>
                <span>Заметка не будет отправлена клиенту</span>
                <button type="button">Сохранить заметку</button>
              </div>
            </form>
          </article>

          <aside className="detailsAside">
            <section className="detailsCard propertiesCard">
              <h2>Свойства</h2>
              <dl>
                <div>
                  <dt>Статус</dt>
                  <dd>{statusLabels[ticket.status]}</dd>
                </div>
                <div>
                  <dt>Исполнитель</dt>
                  <dd>{ticket.assignee}</dd>
                </div>
                <div>
                  <dt>SLA</dt>
                  <dd>{ticket.sla}</dd>
                </div>
                <div>
                  <dt>Приоритет</dt>
                  <dd>{priorityLabels[ticket.priority]}</dd>
                </div>
                <div>
                  <dt>Канал</dt>
                  <dd>{ticket.channel}</dd>
                </div>
              </dl>
            </section>

            <section className="detailsCard clientCard">
              <p>Организация</p>
              <h2>{ticket.clinicName}</h2>
              <span>Договор поддержки · стандарт</span>
              <a href="#/">Открыть карточку клиента →</a>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}
