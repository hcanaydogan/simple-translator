import React from "react";
import { Provider as TranslationProvider } from '../contexts/TranslationContext';
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";
import TranslationsList from "./TranslationsList";

function TranslationPage() {
  console.log('%cTranslationPage', logStyle('radial-gradient(crimson, transparent)'));
  return (
    <TranslationProvider>
      <header>
        <i className="icon__translate"></i>
        <h1>Simple Translator</h1>
      </header>
      <main>
        <TranslationInput />
        <TranslationOutput />
      </main>
      <TranslationsList />
      <footer></footer>
    </TranslationProvider>
  );
}

export default TranslationPage;