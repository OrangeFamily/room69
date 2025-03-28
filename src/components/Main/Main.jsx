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

  const dataModal = (title, price, text, src, category, description) => {
    toggleModal();
    setObjectModal({ title, price, text, src, category, description });
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

  const openKaraokeFile = () => {
    // window.open(karaoke, '_blank');
    window.location.href = 'https://orangefamily.github.io/mainMusic/';
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
                  onModal={(title, price, text, src, description) =>
                    dataModal(
                      title,
                      price,
                      text,
                      src,
                      category.category,
                      description
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
                          onModal={(title, price, text, src, description) =>
                            dataModal(
                              title,
                              price,
                              text,
                              src,
                              category.category,
                              description
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

      <h2
        className={`${s.categoryTitle} ${s.karaoke}`}
        onClick={openKaraokeFile}
      >
        Пісні караоке
      </h2>
      <h2
        className={`${s.categoryTitle} ${s.karaoke}`}
        onClick={() => setShowRules(!showRules)}
      >
        ПРАВИЛА ЗАКЛАДУ ROOM 69
      </h2>
      {showRules && (
        <div className={s.rules}>
          <p className={s.rules}>
            Вітаємо вас у Room 69! Ми прагнемо створити комфортну та безпечну
            атмосферу для всіх гостей. Просимо ознайомитися з правилами закладу:<br /><br />
            <br /><h3>1. Графік роботи та караоке</h3> <br />• Заклад працює з п’ятниці по неділю з
            18:00 до 23:00. <br />• Остання композиція у караоке приймається до 22:45.
            <br />• У нашому закладі не вмикаються жодні російськомовні пісні. <br /><h3>2.
            Відвідування закладу</h3> <br />• Відвідування можливе лише за попереднім
            бронюванням столика або у разі наявності вільних місць. <br />• У п’ятницю
            та суботу вхід платний. <br />• У закладі діє мінімальне замовлення, сума
            якого залежить від дня тижня та типу бронювання. <br /><h3>3. Правила караоке</h3>
            <br />• Виконання пісень відбувається по колу проти годинникової стрілки,
            починаючи зі столу у VIP-зоні. <br />• Кожен стіл отримує дві пісні за
            чергою. Якщо компанія займає два або більше столів, їй надається
            чотири пісні за чергою. <br />• Можна замовити виконання пісні поза чергою
            – 300 грн. <br />• Якщо ви хочете просто послухати пісню без виконання –
            100 грн. <br />• За один караоке-круг можна виконати не більше трьох
            пісень поза чергою. <br />• З цих трьох позачергових пісень не більше двох
            можуть бути від одного столу. <br /><h3>4. Вікові обмеження та
            відповідальність</h3> <br />• Вхід до закладу дозволений лише для гостей 18+.
            <br /><h3>5. Заборонено</h3> <br />• Приносити та вживати власні напої та їжу. <br />• Корк-фі
            (можливість приносити свій алкоголь) діє лише за спеціальних
            банкетних умовах та за попереднім погодженням з адміністрацією. <br />•
            Приносити колючо-ріжучі предмети, вогнепальну та травматичну зброю,
            газові балончики, кастети та інші небезпечні предмети. <br />• Вхід у
            стані сильного алкогольного або наркотичного сп’яніння. <br />• Агресивна
            поведінка, конфлікти з персоналом або іншими гостями. <br /><h3>6.
            Відповідальність гостей</h3> <br />• У разі псування майна або биття посуду
            гість зобов’язаний відшкодувати вартість збитків. Актуальні ціни
            можна переглянути за QR-кодом у меню. <br /><h3>7. Права адміністрації</h3> <br />•
            Адміністрація має право відмовити у вході або обслуговуванні без
            пояснення причин. <br />• У разі порушення правил гостя можуть попросити
            покинути заклад без повернення коштів за вхід чи замовлення. <br /><br />Дякуємо
            за розуміння та бажаємо приємного відпочинку!
          </p>
        </div>
      )}
      {showModal && (
        <Modal objectModal={objectModal} toggleModal={toggleModal} />
      )}
    </div>
  );
};

export default Main;
