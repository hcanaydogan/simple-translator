import React, { useState, useContext, useCallback } from 'react';
import TranslationContext from '../contexts/TranslationContext';
import SpeakTextButton from './SpeakTextButton';

function TranslationOutput() {
  console.log('%cTranslationOutput', logStyle('darkorange'));
  const { translatedText, saveTranslation } = useContext(TranslationContext);
  const [speakActive, setSpeakActive] = useState(false);

  const onSpeakStart = useCallback(() => setSpeakActive(true), []);
  const onSpeakEnd = useCallback(() => setSpeakActive(false), []);

  function _saveTranslation() { 
    saveTranslation();
  }

  return (
    <div>
      <h3>Turkish</h3>
      <textarea readOnly={true} className="input-area" value={translatedText}>
      </textarea>
      <div className="translation-buttons">
        <SpeakTextButton text={translatedText} onStart={onSpeakStart} onEnd={onSpeakEnd} />
        <button className='button' onClick={_saveTranslation} disabled={speakActive}><i className='icon__backup'></i></button>
      </div>
    </div>
  );
}

export default TranslationOutput;