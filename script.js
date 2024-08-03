let speech = new SpeechSynthesisUtterance()
let voices = []
let voiceSelect = document.querySelector('select')
let textArea = document.querySelector('textarea')
let button = document.querySelector('button')

// Завантаження збережених значень з localStorage
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('selectedVoice')) {
    voiceSelect.value = localStorage.getItem('selectedVoice')
  }
  if (localStorage.getItem('text')) {
    textArea.value = localStorage.getItem('text')
  }
})

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices()
  speech.voice = voices[0]

  voices.forEach((voice, i) => {
    let option = new Option(voice.name, i)
    voiceSelect.options[i] = option
    if (i == voiceSelect.value) {
      speech.voice = voice
    }
  })

  // Встановлення вибраного голосу після завантаження голосів
  if (localStorage.getItem('selectedVoice')) {
    speech.voice = voices[localStorage.getItem('selectedVoice')]
  }
}

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value]
  localStorage.setItem('selectedVoice', voiceSelect.value)
})

button.addEventListener('click', () => {
  speech.text = textArea.value
  window.speechSynthesis.speak(speech)
  localStorage.setItem('text', textArea.value)
})

// let speech = new SpeechSynthesisUtterance()

// let voices = []
// let voiceSelect = document.querySelector('select')
// window.speechSynthesis.onvoiceschanged = () => {
//   voices = window.speechSynthesis.getVoices()
//   speech.voice = voices[0]

//   voices.forEach(
//     (voice, i) => (voiceSelect.options[i] = new Option(voice.name, i))
//   )
// }

// voiceSelect.addEventListener('change', () => {
//   speech.voice = voices[voiceSelect.value]
// })

// document.querySelector('button').addEventListener('click', () => {
//   speech.text = document.querySelector('textarea').value
//   window.speechSynthesis.speak(speech)
// })
