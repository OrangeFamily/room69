import { useEffect } from 'react';
import s from './Modal.module.scss'

export const Modal = ({ objectModal, toggleModal }) => {
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

  return (
    <div className={s.backdrop} onClick={handleCloseBackdrop}>
      <div className={s.modal}>
        <h2 className={s.itemTitle}>{objectModal.title}</h2>
        <h3 className={s.itemTitle}>{objectModal.price}</h3>
        <div className={s.itemText}>{objectModal.text}</div>
        <img src={objectModal.src} alt="" className={s.imgSize}/>
      </div>
    </div>
  );
};
