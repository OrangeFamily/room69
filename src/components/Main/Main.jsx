import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { List } from "components/comp/List/List";
import { Modal } from "components/comp/Modal/Modal";
import { menuData } from "components/Menu/data/bar";
import s from "./Main.module.scss";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [objectModal, setObjectModal] = useState({});

  const dataModal = (title, price, text, src) => {
    toggleModal();
    setObjectModal({ title, price, text, src });
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={s.main}>
      {/* Головний рівень категорій */}
      <Accordion type="multiple" collapsible className={s.accordion}>
        {menuData.map((category, index) => (
          <AccordionItem
            key={index}
            value={`category-${index}`}
            className={s.accordionItem}
          >
            <AccordionTrigger className={s.trigger}>
              <h2 className={s.categoryTitle}>{category.category}</h2>
            </AccordionTrigger>
            <AccordionContent className={s.content}>
              {/* Вкладений рівень підкатегорій */}
              <Accordion type="multiple" collapsible>
                {category.subcategories.map((subcategory, subIndex) => (
                  <AccordionItem
                    key={subIndex}
                    value={`subcategory-${subIndex}`}
                    className={s.accordionSubItem}
                  >
                    <AccordionTrigger className={s.subTrigger}>
                      <h3 className={s.subcategoryTitle}>{subcategory.subcategory}</h3>
                    </AccordionTrigger>
                    <AccordionContent className={s.subContent}>
                      {/* Список страв */}
                      <List data={subcategory.items} onModal={dataModal} subcategory={subcategory.subcategory} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
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
