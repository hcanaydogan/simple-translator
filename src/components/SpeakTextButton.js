import React, { useState, useEffect } from 'react';

function SpeakTextButton({ text }) {
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

    utterance.onend = (event) => {
      setActive(false);
    }

    utterance.onstart = () => {
      setActive(true);
    }

    speechSynthesis.speak(utterance);
  }

  return (
    <button className={`button ${active ? 'ping' : ''}`} onClick={speak}><i className={active ? 'icon__stop' : 'icon__speak'}></i></button>
  );
}

export default SpeakTextButton;