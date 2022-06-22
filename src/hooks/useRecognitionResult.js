import React, { useReducer, useCallback } from 'react';

const initialState = {
  finalTranscript: '',
  interimTranscript: ''
};

const interimTranscriptReset = () => ({ type: 'interimTranscriptReset' });
const interimTranscriptAdded = transcript => ({ type: 'interimTranscriptAdded', payload: transcript });
const finalTranscriptAdded = transcript => ({ type: 'finalTranscriptAdded', payload: transcript });
const finalTranscriptSet = transcript => ({ type: 'finalTranscriptSet', payload: transcript });

function reducer(state, action) {
  console.log('%c action', logStyle('green'), action);
  switch (action.type) {
    case 'interimTranscriptReset':
      return { ...state, interimTranscript: '' };
    case 'interimTranscriptAdded':
      return { ...state, interimTranscript: state.interimTranscript + action.payload };
    case 'finalTranscriptAdded':
      return { ...state, finalTranscript: state.finalTranscript + action.payload + ' ' };
    case 'finalTranscriptSet':
      return { ...state, finalTranscript: action.payload };
    default:
      throw new Error();
  }
}

function useRecognitionResult(){
  const [{finalTranscript, interimTranscript}, dispatch] = useReducer(reducer, initialState);

  const onRecognitionResult = useCallback(event => {
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
  }, []);

  const setFinalTranscript = value => dispatch(finalTranscriptSet(value));

  return {finalTranscript, interimTranscript, onRecognitionResult, setFinalTranscript};
}

export default useRecognitionResult;