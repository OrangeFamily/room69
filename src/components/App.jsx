import Header from './Header/Header';
import Main from './Main/Main';
import s from './App.module.scss';

export const App = () => {
  return (
    <>
      <Header />
      <div className={s.container}>
          <Main />
      </div>
    </>
  );
};
