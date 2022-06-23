import React, { createContext, useState } from "react";
import { getTranslationEngToTr } from '../services/translation/argosopentech.api';

const TranslationContext = createContext();

function Provider({children}){
  const [translatedText, setTranslatedText] = useState('');
  const [translationHistory, setTranslationHistory] = useState([]);

  async function getTranslation(text) {
    console.log('  %cgetTranslation', logStyle('crimson'), text);
    try {
      const res = await getTranslationEngToTr(text);
      setTranslatedText(res.translatedText);
      console.log(res.translatedText);
    } catch (e) {
      console.log(e);
    }
  }

  const value = {
    translatedText,
    getTranslation,
    translationHistory,
    setTranslationHistory
  };
  return (
    <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
  );
}

export default TranslationContext;
export { Provider };