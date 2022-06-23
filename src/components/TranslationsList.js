import React, { useContext } from 'react';
import TranslationContext from '../contexts/TranslationContext';

function TranslationsList() {
  console.log('%cTranslationsList', logStyle('purple'));
  const { translationHistory } = useContext(TranslationContext);
  console.log(translationHistory)
  return (
    <div className="translations-list">
      <h2>Translation History</h2>
      {translationHistory.map(({ text, translation}, i) => (
        <div key={i} style={{display: 'flex'}}>
            <div style={{margin: '1rem'}}>{text}</div>
            <div style={{margin: '1rem'}}>{translation}</div>
        </div>
      ))}
    </div>
  );
}

export default TranslationsList;