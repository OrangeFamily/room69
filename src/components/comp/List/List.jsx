import s from './List.module.scss';
export const List = ({ data, onModal, subcategory }) => {
  return data.map(e => (
    <div
      key={e.id}
      onClick={() => onModal(e.title, e.price, e.text, e.src)}
      className={s.item}
    >
      <img src={e.src} alt="" className={s.sizeImg} />
      <div className={s.itemBox}>
        <div className={s.itemMain}>
          <h3 className={`${s.title} ${subcategory==='Пиво'? s.beer:''}`}>
            {e.title}
            {e.isNew ? <span className={s.newWord}>NEW</span> : null}
          </h3>
          <div className={s.boxPrice}>
            <h3 className={`${s.price} ${subcategory==='Пиво'? s.widthPrice:''}`}>{e.price}</h3>
            {e.price2 ? <h3 className={`${s.price} ${subcategory==='Пиво'? s.widthPrice:''}`}>{e.price2}</h3> : null}
          </div>
        </div>

        <p className={s.text}>{e.text}</p>
      </div>
    </div>
  ));
};
