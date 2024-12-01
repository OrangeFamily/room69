import { motion } from 'framer-motion';
import React, { useState } from 'react';
import s from './Main.module.scss';
import { List } from 'components/comp/List/List';
import { barData } from 'components/Menu/Bar/data/bar';
import { Modal } from 'components/comp/Modal/Modal';

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [objectModal, setObjectModal] = useState({});
  const [open, setOpen] = useState(null);

  const dataModal = (title, price, text, src) => {
    toggleModal();
    setObjectModal({ title, price, text, src });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const toggleAccordion = index => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className={s.main}>
      {barData.map((category, index) => (
        <div key={index} className={s.chapter}>
          <h2 onClick={() => toggleAccordion(index)} className={s.titleItem}>
            {category.category}
          </h2>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: open === index ? 'auto' : 0,
              opacity: open === index ? 1 : 0,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: { duration: 0.5, ease: 'easeInOut' },
              opacity: {
                duration: 0.3,
                ease: 'easeInOut',
                delay: open === index ? 0.2 : 0,
              },
            }}
            className={s.collapseContent}
          >
            {open === index && (
              <List data={category.items} onModal={dataModal} />
            )}
          </motion.div>
        </div>
      ))}
      {showModal && (
        <Modal objectModal={objectModal} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Main;
