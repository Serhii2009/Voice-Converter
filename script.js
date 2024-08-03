let speech = new SpeechSynthesisUtterance()
let voices = []
let voiceSelect = document.querySelector('select')
let textArea = document.querySelector('textarea')
let button = document.querySelector('button')

// Зберегти дані в Local Storage
function saveData() {
  localStorage.setItem('text', textArea.value)
  localStorage.setItem('voiceIndex', voiceSelect.value)
}

// Завантажити дані з Local Storage
function loadData() {
  const savedText = localStorage.getItem('text')
  const savedVoiceIndex = localStorage.getItem('voiceIndex')

  if (savedText) {
    textArea.value = savedText
  }

  if (savedVoiceIndex) {
    voiceSelect.value = savedVoiceIndex
    speech.voice = voices[savedVoiceIndex]
  }
}

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices()

  voices.forEach((voice, i) => {
    let option = new Option(voice.name, i)
    voiceSelect.options[i] = option
  })

  loadData() // Завантаження даних після заповнення списку голосів
}

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value]
  saveData() // Зберегти дані при зміні вибраного голосу
})

button.addEventListener('click', () => {
  speech.text = textArea.value
  window.speechSynthesis.speak(speech)
  saveData() // Зберегти дані при натисканні кнопки
})

loadData() // Завантажити дані при завантаженні сторінки
