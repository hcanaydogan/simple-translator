import React, { useState, useRef, useReducer, useCallback, useContext, useEffect } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';
import useRecognitionResult from '../hooks/useRecognitionResult';
import TranslationContext from '../contexts/TranslationContext';

function TranslationOutput() {
  console.log('%cTranslationOutput', logStyle('darkorange'));
  const { translatedText } = useContext(TranslationContext);
  const [active, setActive] = useState(false);

  //@TODO reafactor -- this is just sketch
  const [trVoice, setTrVoice] = useState(false);

  //@TODO reafactor -- this is just sketch
  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      console.log('tr voice')
      setTrVoice(speechSynthesis.getVoices().find(({lang}) => lang == 'tr-TR'));
    }
  }, []);

  function saveToLocalStorage() {}

  //@TODO reafactor -- this is just sketch
  function speak() {
    
    let utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.voice = trVoice;
    utterance.onend = (event) => {
        console.log('end', event);
        setActive(false);
    }
    utterance.onstart = () => {
      console.log('start', event);
      setActive(true);
    }
    speechSynthesis.speak(utterance);
   }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <textarea readOnly={true} className="input-area" value={translatedText}>
      </textarea>
      <div style={{ display: 'flex', justifyContent: 'end'}}>
        
        {/*@TODO reafactor -- this is just sketch*/}
      <button className={`button ${active ? 'ping' : ''}`} onClick={speak}><i className={active ? 'icon__stop' : 'icon__speak'}></i></button>

      <button className='button' onClick={saveToLocalStorage}><i className='icon__backup'></i></button>
      </div>
    </div>
  );
}

export default TranslationOutput;