import { useEffect, useState } from 'react';
import s from './Modal.module.scss';
import oops from '../List/img/oops.webp'

export const Modal = ({ objectModal, toggleModal }) => {
  const [isImageLoading, setIsImageLoading] = useState(true); // Стан завантаження

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleCloseBackdrop = e => {
    if (e.target.nodeName !== 'DIV') return;
    toggleModal();
  };

  const handleImageLoad = () => {
    setIsImageLoading(false); // Зображення завантажилось
  };

  return (
    <div className={s.backdrop} onClick={handleCloseBackdrop}>
      <div className={s.modal}>
        <h2 className={s.itemTitle}>{objectModal.title}</h2>
        <h3 className={s.itemTitle}>{objectModal.price}</h3>
        {objectModal.price2 ? <h3 className={s.itemTitle}>{objectModal.price2}</h3> : null}
        <div className={s.itemText}>{objectModal.text}</div>
        {/* Лоадер */}
        {isImageLoading && <div className={s.loader}>Loading...</div>}
        {/* Зображення */}
        <img
          src={objectModal.src || oops}
          alt={objectModal.title}
          className={s.imgSize}
          onLoad={handleImageLoad} // Викликається, коли зображення завантажилось
          style={{ display: isImageLoading ? 'none' : 'block' }} // Приховуємо, поки не завантажиться
        />
      </div>
    </div>
  );
};
