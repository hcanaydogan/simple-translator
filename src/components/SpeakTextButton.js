import React, { useState, useEffect, memo } from 'react';

function SpeakTextButton({ text, onStart, onEnd }) {
  console.log(' %cSpeakTextButton', logStyle('orange'));

  const [active, setActive] = useState(false);
  const [trVoice, setTrVoice] = useState(false);

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      console.log('  %c tr voice set', 'font-size: 12px; background: orange; border-radius: 4px; color: white;');
      setTrVoice(speechSynthesis.getVoices().find(({ lang }) => lang == 'tr-TR'));
    }
  }, []);

  function speak() {
    if(active){
      speechSynthesis.cancel();
      return;
    }

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = trVoice;

    utterance.onstart = () => {
      setActive(true);
      onStart();
    }

    utterance.onend = (event) => {
      setActive(false);
      onEnd();
    }

    speechSynthesis.speak(utterance);
  }

  return (
    <button className={`button ${active ? 'ping' : ''}`} onClick={speak}><i className={active ? 'icon__stop' : 'icon__speak'}></i></button>
  );
}

export default memo(SpeakTextButton);