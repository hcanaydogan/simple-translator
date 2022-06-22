import React, { useState, useRef, useReducer } from 'react';
import SpeechRecognitionButton from './SpeechRecognitionButton';

const initialState = {
  finalTranscript: '',
  interimTranscript: ''
};

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
      return { ...state, finalTranscript: state.finalTranscript +  action.payload + ' '};
    case 'finalTranscriptSet':
      return { ...state, finalTranscript: action.payload };
    default:
      throw new Error();
  }
}

function TranslateInput() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [readOnly, setReadOnly] = useState(false);
  const textAreaInput = useRef(null);

  console.log('%cTranslateInput', logStyle('red'));

  const handleTextareaChange = ({target: { value }}) => {
    console.log('%cvalue', logStyle(), value);
    dispatch(finalTranscriptSet(value))
  };

  const onRecognitionResult = event => {
    dispatch(interimTranscriptReset());
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        console.log('%cfinal', logStyle('green'));
        dispatch(finalTranscriptAdded(event.results[i][0].transcript));
      } else {
        console.log('%cinterim', logStyle('blue'));
        dispatch(interimTranscriptAdded(event.results[i][0].transcript));
      }
    }
  };

  const onRecognitionStart = () => setReadOnly(true);
  const onRecognitionEnd = () => (setReadOnly(false), textAreaInput.current.focus());
  const onRecognitionError = (err) => console.error(err);

  return (
    <div>
      <textarea ref={textAreaInput} className="input-area" value={`${state.finalTranscript}${state.interimTranscript}`} onChange={handleTextareaChange} readOnly={readOnly} autoFocus>
      </textarea>
      <SpeechRecognitionButton options={{interimResults: true, lang: 'en-Us'}} onStart={onRecognitionStart} onEnd={onRecognitionEnd} onResult={onRecognitionResult} onError={onRecognitionError}/>
    </div>
  );
}

export default TranslateInput;