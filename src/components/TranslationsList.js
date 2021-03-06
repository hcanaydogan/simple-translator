import React, { useContext } from 'react';
import TranslationContext from '../contexts/TranslationContext';

function TranslationsList() {
  console.log('%cTranslationsList', logStyle('purple'));
  const { translationHistory, clearTranslationHistory } = useContext(TranslationContext);

  if(!translationHistory.length) return null;

  return (
    <div className="translations-list-container">
      <div className="tanslation-list-title">
        <h2>Translation History (English to Turkish)</h2>
        <span id="clear-all-button" onClick={clearTranslationHistory}>Clear All</span>
      </div>
      <div className="translations-list">
        {translationHistory.sort((x, y) => y.id - x.id).map(({ id, text, translation, createdAt }) => {
          if (!text || !translation) return;
          return (
            <div key={id} className="translations-list-item">
              <div>{createdAt}</div>
              <div>{text}</div>
              <div>{translation}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TranslationsList;