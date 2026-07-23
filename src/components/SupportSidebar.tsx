type SupportSidebarProps = {
  newCount?: number;
  inProgressCount?: number;
};

export function SupportSidebar({
  newCount = 0,
  inProgressCount = 0,
}: SupportSidebarProps) {
  return (
    <aside className="supportSidebar">
      <a className="supportBrand" href="#/">
        <span className="supportBrandMark">E</span>
        <span>
          <strong>Ernest</strong>
          <small>support desk</small>
        </span>
      </a>

      <nav className="supportNav" aria-label="Очереди поддержки">
        <p>Рабочее пространство</p>
        <a className="isActive" href="#/">
          <span><i className="navDot blue" /> Входящие</span>
          <b>{newCount}</b>
        </a>
        <a href="#/">
          <span><i className="navDot amber" /> В работе</span>
          <b>{inProgressCount}</b>
        </a>
        <a href="#/">
          <span><i className="navDot gray" /> Мои обращения</span>
        </a>
        <a href="#/">
          <span><i className="navDot green" /> Решённые</span>
        </a>
      </nav>

      <nav className="supportNav secondaryNav" aria-label="Справочники">
        <p>Справочники</p>
        <a href="#/"><span>Организации</span></a>
        <a href="#/"><span>База знаний</span></a>
        <a href="#/"><span>Отчёты</span></a>
      </nav>

      <div className="supportUser">
        <span className="supportUserAvatar">ЕМ</span>
        <span>
          <strong>Эрнест Музафаров</strong>
          <small>1-я линия · онлайн</small>
        </span>
        <button type="button" aria-label="Настройки профиля">···</button>
      </div>
    </aside>
  );
}
