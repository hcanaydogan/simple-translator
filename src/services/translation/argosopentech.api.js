const API_URL = "https://translate.argosopentech.com/translate";

export async function getTranslationEngToTr(text) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: "en",
      target: "tr"
    }),
    headers: { "Content-Type": "application/json" }
  });

  return await res.json();
}