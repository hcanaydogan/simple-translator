import React, { useState, useRef, memo } from 'react';

function SpeechRecognitionButton({onStart, onEnd, onResult, onError, options}) {
  console.log(' %cSpeechRecognitionButton', logStyle('lightseagreen'));
  
  const recognition = useRef(null);
  const [active, setActive] = useState(false);

  function getRecognition() {
    if (recognition.current === null) {
      recognition.current = initRecognition();;
    }
    return recognition.current;
  }

  function initRecognition(){
    let rec = new webkitSpeechRecognition();
    Object.assign(rec, options);
    rec.onstart = () => {
      setActive(true);
      onStart();
    };
    rec.onend = () => {
      setActive(false);
      onEnd();
    };
    rec.onresult = onResult;
    rec.onerror = onError;
    return rec;
  }

  function onClickHandler(){
    if(active) getRecognition().stop();
    else getRecognition().start();
  }

  return (
    <button id="speech-to-text-button" className={`button ${active ? 'ping' : ''}`} onClick={onClickHandler}><i className={active ? 'icon__stop' : 'icon__mic'}></i></button>
  );
}

export default memo(SpeechRecognitionButton);