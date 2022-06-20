import React, { useState, useRef, useReducer } from 'react';

const initialState = { finalTranscript: '', interimTranscript: '' };
const interimTranscriptReset = () => ({ type: 'interimTranscriptReset' });
const interimTranscriptAdded = transcript => ({ type: 'interimTranscriptAdded', payload: transcript });
const finalTranscriptAdded = transcript => ({ type: 'finalTranscriptAdded', payload: transcript });
const finalTranscriptSet = transcript => ({ type: 'finalTranscriptSet', payload: transcript });


function reducer(state, action) {
  console.log('%c action', logStyle(), action);
  switch (action.type) {
    case 'interimTranscriptReset':
      return { ...state, interimTranscript: '' };
    case 'interimTranscriptAdded':
      return { ...state, interimTranscript: state.interimTranscript + action.payload };
    case 'finalTranscriptAdded':
      return { ...state, finalTranscript: state.finalTranscript +  action.payload };
    case 'finalTranscriptSet':
      return { ...state, finalTranscript: action.payload };
    default:
      throw new Error();
  }
}


export default function TranslateInput() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [viewMode, setViewMode] = useState(false);
  const textAreaInput = useRef(null);

  console.log('%cTranslateInput', logStyle('red'));
  function handleTextareaChange({ target: { value } }) {
    console.log('%cvalue', logStyle(), value);
    dispatch(finalTranscriptSet(value))
  }

  function speechToText() {
    var recognition = new webkitSpeechRecognition();
    //recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      dispatch(interimTranscriptReset());
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          console.log('%cfinal', logStyle('green'));
          dispatch(finalTranscriptAdded(' ' + event.results[i][0].transcript));
        } else {
          console.log('%cinterim', logStyle('blue'));
          dispatch(interimTranscriptAdded(' ' + event.results[i][0].transcript));
        }
      }
    }

    recognition.onstart = () => {
      setViewMode(true);
    };
    recognition.onend = () => {
      setViewMode(false);
      textAreaInput.current.focus();
    };
    recognition.onspeechstart = (...args) => {
      console.log('%c speechstart', logStyle(),args)
    };
    recognition.start();
  }

  return (
    <div>
      <textarea ref={textAreaInput} className="input-area" value={`${state.finalTranscript}${state.interimTranscript}`} onChange={handleTextareaChange} readOnly={viewMode} autoFocus>
      </textarea>
      <button id="speech-to-text-button" className="button" onClick={speechToText}><i className="icon__mic"></i></button>
    </div>
  );
}