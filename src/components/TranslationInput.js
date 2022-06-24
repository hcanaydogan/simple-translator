import React, { useState, useRef, useCallback, useContext } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';
import useRecognitionResult from '../hooks/useRecognitionResult';
import TranslationContext from '../contexts/TranslationContext';

function TranslationInput() {
  console.log('%cTranslationInput', logStyle('forestgreen'));
  const { getTranslation, fetchingTranslation, clearTranslation } = useContext(TranslationContext);

  const [recognitionActive, setRecognitionActive] = useState(false);
  const textAreaInput = useRef(null);

  const recognitionOptions = useRef({ interimResults: true, lang: 'en-US', /*continuous: true*/ }).current;

  const { finalTranscript, interimTranscript, onRecognitionResult, setFinalTranscript } = useRecognitionResult();
  const onRecognitionStart = useCallback(() => setRecognitionActive(true), []);
  const onRecognitionEnd = useCallback(() => (setRecognitionActive(false), textAreaInput.current.focus()), []);
  const onRecognitionError = useCallback((err) => console.error(err), []);

  const handleTextareaChange = ({ target: { value } }) => {
    setFinalTranscript(value);
  };

  function handleTranslateClick() {
    getTranslation(finalTranscript);
  }

  function clearFinalTrnascript(){
    setFinalTranscript('');
    clearTranslation();
  }

  return (
    <div className="translation-inputs">
      <h3>English</h3>
      <div className="translation-textarea">
        <textarea ref={textAreaInput} className="input-area" value={`${finalTranscript}${interimTranscript}`} onChange={handleTextareaChange} readOnly={recognitionActive} autoFocus>
        </textarea>
        {recognitionActive && <i className="icon__hearing action-positive pulse"></i>}
      </div>

      <div className="translation-buttons">
        <span id="clear-button" onClick={clearFinalTrnascript}>Clear</span>
        <SpeechRecognitionButton options={recognitionOptions} onStart={onRecognitionStart} onEnd={onRecognitionEnd} onResult={onRecognitionResult} onError={onRecognitionError} />
        <button className={`button ${fetchingTranslation ? 'loading pulse' : ''}`} onClick={handleTranslateClick} disabled={recognitionActive}><i className='icon__translate'></i></button>
      </div>
    </div>
  );
}

export default TranslationInput;