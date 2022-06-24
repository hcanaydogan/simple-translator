import React, { createContext, useState, useEffect } from "react";
import { getTranslationEngToTr } from '../services/translation/argosopentech.api';
import { addItemToList, getList, clearList } from '../services/browser/localstorage.api';

const TranslationContext = createContext();

function Provider({children}){
  console.log('%cTranslationContext', logStyle('radial-gradient(blue, transparent)'));
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fetchingTranslation, setFetchingTranslation] = useState(false);
  const [translationHistory, setToTranslationHistory] = useState([]);

  useEffect(() => {
    setToTranslationHistory(getList('saved_translations') || []);
  }, []);

  function clearTranslation(){
    setText('');
    setTranslatedText('');
  }

  async function getTranslation(text) {
    console.log('%cgetTranslation', logStyle('crimson'), text);
    try {
      setFetchingTranslation(true);
      const res = await getTranslationEngToTr(text);
      setText(text);
      setTranslatedText(res.translatedText);
    } catch (e) {
      console.error(e);
    } finally{
      setFetchingTranslation(false);
    }
  }

  function saveTranslation() {
    addItemToList('saved_translations', {text, translation: translatedText});
    setToTranslationHistory(getList('saved_translations'));
  }

  function clearTranslationHistory(){
    clearList('saved_translations');
    setToTranslationHistory(getList('saved_translations'));
  }

  const value = {
    translatedText,
    getTranslation,
    translationHistory,
    saveTranslation,
    clearTranslation,
    clearTranslationHistory,
    fetchingTranslation
  };

  return (
    <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
  );
}

export default TranslationContext;
export { Provider };