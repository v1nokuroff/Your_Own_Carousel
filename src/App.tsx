import React, {useState} from 'react';
import { translations } from './language/translations';
import Carousel from './Carousel';

type Language = 'en' | 'ru';



const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
      <div>
        <Carousel />
      </div>
  );
};


export default App;