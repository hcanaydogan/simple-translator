import React, { useState, useRef, useReducer, useCallback, useContext, useEffect } from 'react';
import TranslationContext from '../contexts/TranslationContext';
import SpeakTextButton from './SpeakTextButton';

function TranslationOutput() {
  console.log('%cTranslationOutput', logStyle('darkorange'));
  const { translatedText } = useContext(TranslationContext);

  function saveToLocalStorage() { }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea readOnly={true} className="input-area" value={translatedText}>
      </textarea>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <SpeakTextButton text={translatedText} />
        <button className='button' onClick={saveToLocalStorage}><i className='icon__backup'></i></button>
      </div>
    </div>
  );
}

export default TranslationOutput;