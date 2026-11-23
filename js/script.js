// Navigation et lecture audio en français
document.addEventListener("click", function(e) {
  const button = e.target.closest("[data-speak]");
  if (!button) return;
  const text = button.getAttribute("data-speak");
  if (!("speechSynthesis" in window)) {
    alert("La synthèse vocale n'est pas disponible dans ce navigateur.");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
});


// Lecture audio des résumés avec la synthèse vocale du navigateur.
let activeSpeechButton = null;
function readSummary(button) {
  if (!("speechSynthesis" in window)) {
    alert("La lecture audio n'est pas prise en charge par ce navigateur.");
    return;
  }
  const synth = window.speechSynthesis;
  if (synth.speaking && activeSpeechButton === button) {
    synth.cancel();
    button.classList.remove("is-speaking");
    button.textContent = "▶ Écouter le résumé";
    activeSpeechButton = null;
    return;
  }
  synth.cancel();
  document.querySelectorAll(".audio-btn").forEach((b) => {
    b.classList.remove("is-speaking");
    b.textContent = "▶ Écouter le résumé";
  });
  const text = button.dataset.text || "";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.onend = utterance.onerror = () => {
    button.classList.remove("is-speaking");
    button.textContent = "▶ Écouter le résumé";
    if (activeSpeechButton === button) activeSpeechButton = null;
  };
  activeSpeechButton = button;
  button.classList.add("is-speaking");
  button.textContent = "Ⅱ Arrêter la lecture";
  synth.speak(utterance);
}
window.addEventListener("beforeunload", () => {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
});
