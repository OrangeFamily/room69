import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { List } from 'components/comp/List/List';
import { Modal } from 'components/comp/Modal/Modal';
import { menuData } from 'components/Menu/data/data';
import s from './Main.module.scss';
// import karaoke from './sorted_songs_by_artist.txt';

const AnimatedAccordionContent = ({ children, isOpen }) => (
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={
      isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
    }
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className={s.animatedContent}
  >
    {children}
  </motion.div>
);

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [objectModal, setObjectModal] = useState({});
  const [openCategories, setOpenCategories] = useState({}); // Відкриті категорії
  const [openSubcategories, setOpenSubcategories] = useState({}); // Відкриті підкатегорії
  const [showRules, setShowRules] = useState(false);

  const dataModal = (title, price, text, src, category, description, zvd) => {
    toggleModal();
    setObjectModal({ title, price, text, src, category, description, zvd });
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleToggleCategory = index => {
    setOpenCategories(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleToggleSubcategory = (categoryIndex, subIndex) => {
    setOpenSubcategories(prev => ({
      ...prev,
      [`${categoryIndex}-${subIndex}`]: !prev[`${categoryIndex}-${subIndex}`],
    }));
  };

  return (
    <div className={s.main}>
      <Accordion type="multiple" collapsible className={s.accordion}>
        {menuData.map((category, categoryIndex) => (
          <AccordionItem
            key={categoryIndex}
            value={`category-${categoryIndex}`}
            className={s.accordionItem}
          >
            <AccordionTrigger
              className={s.trigger}
              onClick={() => handleToggleCategory(categoryIndex)}
            >
              <h2
                className={`${s.categoryTitle} ${category.category === 'Краш меню' ? s.krush : ''}`}
              >
                {category.category}
              </h2>
            </AccordionTrigger>
            <AnimatedAccordionContent isOpen={!!openCategories[categoryIndex]}>
              {category.category === 'Банкетне меню' ? (
                <List
                  data={category.subcategories.flatMap(sub => sub.items)}
                  onModal={(title, price, text, src, description, zvd,) =>
                    dataModal(
                      title,
                      price,
                      text,
                      src,
                      category.category,
                      description,
                      zvd,
                    )
                  }
                  category={category.category}
                />
              ) : (
                <Accordion type="multiple" collapsible="true">
                  {category.subcategories.map((subcategory, subIndex) => (
                    <AccordionItem
                      key={subIndex}
                      value={`subcategory-${subIndex}`}
                      className={s.accordionSubItem}
                    >
                      <AccordionTrigger
                        className={s.subTrigger}
                        onClick={() =>
                          handleToggleSubcategory(categoryIndex, subIndex)
                        }
                      >
                        <h3 className={s.subcategoryTitle}>
                          {subcategory.subcategory}
                        </h3>
                      </AccordionTrigger>
                      <AnimatedAccordionContent
                        isOpen={
                          !!openSubcategories[`${categoryIndex}-${subIndex}`]
                        }
                      >
                        <List
                          data={subcategory.items}
                          onModal={(
                            title,
                            price,
                            text,
                            src,
                            description,
                            zvd,
                          ) =>
                            dataModal(
                              title,
                              price,
                              text,
                              src,
                              category.category,
                              description,
                              zvd,
                            )
                          }
                          subcategory={subcategory.subcategory}
                          category={category.category}
                        />
                      </AnimatedAccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </AnimatedAccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {showModal && (
        <Modal objectModal={objectModal} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Main;
