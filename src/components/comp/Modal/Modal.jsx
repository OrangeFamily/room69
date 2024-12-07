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

  return (
    <div className={s.backdrop} onClick={handleCloseBackdrop}>
      <div className={s.modal}>
      <img
          src={objectModal.src || oops}
          alt={objectModal.title || 'Image not available'}
          className={`${s.imgSize} ${objectModal.category === 'Коктейлі' ? s.imgModal : ''}`}
          onLoad={handleImageLoad}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />
        <div className={objectModal.category === 'Коктейлі' ? s.mod : ''}>
          <h2 className={s.itemTitle}>{objectModal.title}</h2>
          <h3 className={s.itemTitle}>{objectModal.price}</h3>

          {objectModal.category !== 'Кухня' && (
            <div className={s.itemText}>{objectModal.text}</div>
          )}

          {objectModal.category === 'Кухня' && (
            <div className={s.itemText}>{objectModal.description}</div>
          )}
        </div>

        {isImageLoading && <div className={s.loader}>Loading...</div>}

        
      </div>
    </div>
  );
};
