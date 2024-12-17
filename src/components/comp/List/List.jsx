import s from './List.module.scss';
import oops from './img/oops.webp';
export const List = ({ data, onModal, subcategory }) => {
  document.querySelectorAll('.List_title__78ACw ').forEach((el) => {
    // Перевіряємо, чи елемент вже містить обгорнутий текст
    if (el.innerHTML.includes('<span class="number">')) return;
  
    const content = el.innerHTML;
  
    // Обгортання чисел разом із текстом після них у <span>
    const updatedContent = content.replace(/(\d+\D*)$/, '<span class="number">$1</span>');
  
    el.innerHTML = updatedContent;
  });
  
  
  return data.map(e => (
    <div
      key={e.id}
      onClick={() => onModal(e.title, e.price, e.text, e.src, e.description)}
      className={s.item}
    >
      <img src={e.src || oops} alt={e.title} className={s.sizeImg} />
      <div className={s.itemBox}>
        <div className={s.itemMain}>
          <h3 className={`${s.title} ${subcategory === 'Пиво' ? s.beer : ''}`}>
            {e.title}
            {e.isNew ? <span className={s.newWord}>NEW</span> : null}
          </h3>
          <div className={s.boxPrice}>
            <h3
              className={`${s.price} ${subcategory === 'Пиво' ? s.widthPrice : ''}`}
            >
              {e.price}
            </h3>
            {e.price2 ? (
              <h3
                className={`${s.price} ${subcategory === 'Пиво' ? s.widthPrice : ''}`}
              >
                {e.price2}
              </h3>
            ) : null}
          </div>
        </div>

        <p className={s.text}>{e.text}</p>
      </div>
    </div>
  ));
};
