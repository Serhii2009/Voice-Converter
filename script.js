let speech = new SpeechSynthesisUtterance()
let voices = []
let voiceSelect = document.querySelector('select')
let textarea = document.querySelector('textarea')

function saveText() {
  localStorage.setItem('savedText', textarea.value)
}
function saveVoice() {
  localStorage.setItem('savedVoice', voiceSelect.value)
}

function restoreText() {
  const savedText = localStorage.getItem('savedText')
  if (savedText) {
    textarea.value = savedText
  }
}
function restoreVoice() {
  const savedVoice = localStorage.getItem('savedVoice')
  if (savedVoice) {
    voiceSelect.value = savedVoice
    speech.voice = voices[savedVoice]
  }
}

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices()
  speech.voice = voices[0]

  voices.forEach(
    (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
  )
  restoreVoice()
}

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value]
  saveVoice()
})

document.querySelector('button').addEventListener('click', () => {
  speech.text = textarea.value
  window.speechSynthesis.speak(speech)
  saveText()
})

restoreText()
textarea.addEventListener('input', saveText)
