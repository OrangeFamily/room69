import { useEffect, useState } from 'react';
import s from './Modal.module.scss';
import oops from '../List/img/oops.webp';

export const Modal = ({ objectModal, toggleModal }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleModal]);

  useEffect(() => {
    setIsImageLoading(true); // Скидання стану завантаження при зміні зображення
  }, [objectModal.src]);

  const handleCloseBackdrop = (e) => {
    if (e.target.nodeName !== 'DIV') return;
    toggleModal();
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  document.querySelectorAll('#itemTitle').forEach((el) => {
    // Перевіряємо, чи елемент вже містить обгорнутий текст
    if (el.innerHTML.includes('<span class="number">')) return;
  
    const content = el.innerHTML;
  
    // Обгортання чисел разом із текстом після них у <span>
    const updatedContent = content.replace(/(\d+\D*)$/, '<span class="number">$1</span>');
  
    el.innerHTML = updatedContent;
  });
  return (
    <div className={s.backdrop} onClick={handleCloseBackdrop}>
      <div className={s.modal}>
        {/* Кнопка для закриття модалки */}
        <button className={s.closeButton} onClick={toggleModal}>
          &times;
        </button>

        <img
          src={objectModal.src || oops}
          alt={objectModal.title || 'Image not available'}
          className={s.imgSize}
          onLoad={handleImageLoad}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />

        <div>
          <h2 id='itemTitle' className={s.itemTitle}>{objectModal.title}</h2>
          <h3 className={s.itemPrice}>{objectModal.price}</h3>

          {objectModal.category !== 'Кухня' && (
            <div className={s.itemText}>{objectModal.text}</div>
          )}

          {(objectModal.category === 'Кухня' || objectModal.category === 'Банкетне меню') && (
            <div className={s.itemText}>{objectModal.description}</div>
          )}
        </div>

        {isImageLoading && <div className={s.loader}>Loading...</div>}
      </div>
    </div>
  );
};
