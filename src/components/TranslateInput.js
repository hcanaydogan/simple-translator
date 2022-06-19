import React, { useState, useRef, useReducer } from 'react';

const initialState = { finalTranscript: '', interimTranscript: ''};
const interimTranscriptReset = transcript => ({ type: 'interimTranscriptReset', payload: transcript});
const interimTranscriptAdded = transcript => ({ type: 'interimTranscriptAdded', payload: transcript});
const finalTranscriptAdded = transcript => ({ type: 'finalTranscriptAdded', payload: transcript});

function reducer(state, action) {
  switch (action.type) {
    case 'interimTranscriptReset':
      return {...state, interimTranscript: ''};
    case 'interimTranscriptAdded':
      return {...state, interimTranscript: state.interimTranscript + action.payload };
    case 'finalTranscriptAdded':
      return {...state, finalTranscript: state.finalTranscript + action.payload };
    default:
      throw new Error();
  }
}


export default function TranslateInput() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('%cTranslateInput', logStyle('red'));

  function handleTextareaChange({target: {value}}){
    setText(value);
  }

  function speechToText(){
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      dispatch(interimTranscriptReset(''));
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          console.log('%cfinal', logStyle('green'));
          dispatch(finalTranscriptAdded(event.results[i][0].transcript));
        } else {
          console.log('%cinterim', logStyle('blue'));
          dispatch(interimTranscriptAdded(event.results[i][0].transcript));
        }
      }
    }

    recognition.start();
  }

  return (
    <div>
      <div className="input-area">
        {state.finalTranscript}
        {state.interimTranscript}
      </div>
      <i id="speech-to-text-btn" className="icon__mic button" onClick={speechToText}></i>
    </div>
  );
}