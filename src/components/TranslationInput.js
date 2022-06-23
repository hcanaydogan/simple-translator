import React, { useState, useRef, useCallback, useContext } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';
import useRecognitionResult from '../hooks/useRecognitionResult';
import TranslationContext from '../contexts/TranslationContext';

function TranslationInput() {
  console.log('%cTranslationInput', logStyle('forestgreen'));
  const { getTranslation } = useContext(TranslationContext);

  const [textareaInputReadOnly, setTextareaInputReadOnly] = useState(false);
  const textAreaInput = useRef(null);

  const recognitionOptions = useRef({ interimResults: true, lang: 'en-US', /*continuous: true*/ }).current;

  const { finalTranscript, interimTranscript, onRecognitionResult, setFinalTranscript } = useRecognitionResult();
  const onRecognitionStart = useCallback(() => setTextareaInputReadOnly(true), []);
  const onRecognitionEnd = useCallback(() => (setTextareaInputReadOnly(false), textAreaInput.current.focus()), []);
  const onRecognitionError = useCallback((err) => console.error(err), []);

  const handleTextareaChange = ({ target: { value } }) => {
    //console.log('%cvalue', logStyle('orange'), value);
    setFinalTranscript(value);
  };

  function handleTranslateClick() {
    getTranslation(finalTranscript);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea ref={textAreaInput} className="input-area" value={`${finalTranscript}${interimTranscript}`} onChange={handleTextareaChange} readOnly={textareaInputReadOnly} autoFocus>
      </textarea>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <SpeechRecognitionButton options={recognitionOptions} onStart={onRecognitionStart} onEnd={onRecognitionEnd} onResult={onRecognitionResult} onError={onRecognitionError} />
        <button className='button' onClick={handleTranslateClick}><i className='icon__translate'></i></button>
      </div>
    </div>
  );
}

export default TranslationInput;