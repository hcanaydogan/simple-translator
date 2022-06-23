import React, { createContext, useState, useEffect } from "react";
import { getTranslationEngToTr } from '../services/translation/argosopentech.api';
import { addItemToList, getList } from '../services/browser/localstorage.api';

const TranslationContext = createContext();

function Provider({children}){
  console.log('%cTranslationContext', logStyle('radial-gradient(blue, transparent)'));
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translationHistory, setToTranslationHistory] = useState([]);

  useEffect(() => {
    setToTranslationHistory(getList('saved_translations') || []);
  }, [])


  async function getTranslation(text) {
    console.log('%cgetTranslation', logStyle('crimson'), text);
    try {
      const res = await getTranslationEngToTr(text);
      setText(text);
      setTranslatedText(res.translatedText);
      console.log(res.translatedText);
    } catch (e) {
      console.log(e);
    }
  }

  function saveTranslation() {
    addItemToList('saved_translations', {text, translation: translatedText});
    setToTranslationHistory(getList('saved_translations'));
  }

  const value = {
    translatedText,
    getTranslation,
    translationHistory,
    saveTranslation
  };
  return (
    <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
  );
}

export default TranslationContext;
export { Provider };