import React, { useState, useRef, useReducer, useCallback } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';
import useRecognitionResult from '../hooks/useRecognitionResult';
import { getTranslationEngToTr } from '../services/translation/argosopentech.api';

function TranslateInput() {
  console.log('%cTranslateInput', logStyle('red'));
  
  const [textareaInputReadOnly, setTextareaInputReadOnly] = useState(false);
  const textAreaInput = useRef(null);

  const recognitionOptions = useRef({ interimResults: true, lang: 'en-US', /*continuous: true*/ }).current;
  const {finalTranscript, interimTranscript, onRecognitionResult, setFinalTranscript} = useRecognitionResult();
  const onRecognitionStart = useCallback(() => setTextareaInputReadOnly(true), []);
  const onRecognitionEnd = useCallback(() => (setTextareaInputReadOnly(false), textAreaInput.current.focus()), []);
  const onRecognitionError = useCallback((err) => console.error(err), []);
  
  const [translatedText, setTranslatedText] = useState('');

  const handleTextareaChange = ({ target: { value } }) => {
    console.log('%cvalue', logStyle('orange'), value);
    setFinalTranscript(value);
  };

  async function getTranslation() {
    console.log('onclick')
    try {
      const res = await getTranslationEngToTr(finalTranscript);
      setTranslatedText(res.translatedText);
      console.log(res.translatedText);
    } catch (e) {
      console.log(e);
    }
  }

  function saveToLocalStorage(){}

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea ref={textAreaInput} className="input-area" value={`${finalTranscript}${interimTranscript}`} onChange={handleTextareaChange} readOnly={textareaInputReadOnly} autoFocus>
        </textarea>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <SpeechRecognitionButton options={recognitionOptions} onStart={onRecognitionStart} onEnd={onRecognitionEnd} onResult={onRecognitionResult} onError={onRecognitionError} />
          <button className='button' onClick={getTranslation}><i className='icon__translate'></i></button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <textarea readOnly={true} className="input-area" value={translatedText}>
        </textarea>
        <button style={{alignSelf: 'end'}} className='button' onClick={saveToLocalStorage}><i className='icon__backup'></i></button>
      </div>
    </div>
  );
}

export default TranslateInput;