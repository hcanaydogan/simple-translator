import React, { useState, useRef, useReducer, useCallback, useContext } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';
import useRecognitionResult from '../hooks/useRecognitionResult';
import TranslationContext from '../contexts/TranslationContext';

function TranslationOutput() {
  console.log('%cTranslationOutput', logStyle('darkorange'));
  const { translatedText } = useContext(TranslationContext);

  function saveToLocalStorage() { }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea readOnly={true} className="input-area" value={translatedText}>
      </textarea>
      <button style={{ alignSelf: 'end' }} className='button' onClick={saveToLocalStorage}><i className='icon__backup'></i></button>
    </div>
  );
}

export default TranslationOutput;