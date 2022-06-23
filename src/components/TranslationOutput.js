import React, { useState, useRef, useReducer, useCallback, useContext, useEffect } from 'react';
import TranslationContext from '../contexts/TranslationContext';
import SpeakTextButton from './SpeakTextButton';

function TranslationOutput() {
  console.log('%cTranslationOutput', logStyle('darkorange'));
  const { translatedText, saveTranslation } = useContext(TranslationContext);

  function _saveTranslation() { 
    saveTranslation();
  }

  return (
    <div>
      <h3>Turkish</h3>
      <textarea readOnly={true} className="input-area" value={translatedText}>
      </textarea>
      <div className="translation-buttons">
        <SpeakTextButton text={translatedText} />
        <button className='button' onClick={_saveTranslation}><i className='icon__backup'></i></button>
      </div>
    </div>
  );
}

export default TranslationOutput;