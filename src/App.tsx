import React, {useState} from 'react';
import Carousel from './Carousel';
import './Carousel.css'


export type TypeLanguage = 'en' | 'ru';


const App: React.FC = () => {
  const [language, setLanguage] = useState<TypeLanguage>('en');
  const LanguageSwitcher = () => {
      return (
          <div className='button-group switcher'>
              <button className='button' onClick={() => setLanguage('ru')}>RU</button>
              <button className='button' onClick={() => setLanguage('en')}>EN</button>
          </div>
      )
  }
    return (
      <div className={'App'}>
          <LanguageSwitcher />
          <Carousel language={language} />
      </div>
  );
};


export default App;