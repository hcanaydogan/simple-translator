import React from "react";
import { Provider as TranslationProvider } from '../contexts/TranslationContext';
import TranslationInput from "../components/TranslationInput";
import TranslationOutput from "../components/TranslationOutput";
import TranslationsList from "../components/TranslationsList";

function TranslationPage() {
  console.log('%cTranslationPage', logStyle('radial-gradient(crimson, transparent)'));
  return (
    <TranslationProvider>
      <header>
        <i className="icon__translate"></i>
        <h1>Simple Translator</h1>
      </header>
      <main>
        <div className="translation-container">
          <TranslationInput />
          <TranslationOutput />
        </div>
        <TranslationsList />
      </main>
      <footer></footer>
    </TranslationProvider>
  );
}

export default TranslationPage;