import React from "react";
import { Provider as TranslationProvider } from '../contexts/TranslationContext';
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";
import TranslationsList from "./TranslationsList";

function TranslationPage() {
  console.log('%cTranslationPage', logStyle('radial-gradient(crimson, transparent)'));
  return (
    <TranslationProvider>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <TranslationInput />
        <TranslationOutput />
      </div>
      <TranslationsList />
    </TranslationProvider>
  );
}

export default TranslationPage;